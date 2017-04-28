const express = require( 'express' )
const router = express.Router()
const mysql = require( 'mysql' )
const formidable = require( 'formidable' )
// For node 7+
var os = require( 'os' ); 
os.tmpDir = os.tmpdir;


const path = require( 'path' )
const fs = require( 'fs' )
const _ = require( 'underscore' )
const util = require( 'util' )
const validator = require( 'validator' )

const createDOMPurify = require( 'dompurify' )
const jsdom = require( 'jsdom' )
const window = jsdom.jsdom( '', {
	features: {

		FetchExternalResources: false, // disables resource loading over HTTP / filesystem
		ProcessExternalResources: false // do not execute JS within script blocks

	}
} ).defaultView
const DOMPurify = createDOMPurify( window )



const globalConfigs = require ( '../config/' )
const config = globalConfigs.mysql;

const pool  = mysql.createPool( {

	host: config.host,
	user: config.user,	
	password: config.password,
	database : config.database,
	multipleStatements: true,
	charset: 'UTF8MB4_UNICODE_CI'

} )

const _promiseFetchForm = ( req ) => {

	var form = new formidable.IncomingForm()
	var uploadDir = path.join( __dirname, '../public/uploads' )

	if ( !fs.existsSync( uploadDir ) ){

		fs.mkdirSync( uploadDir )

	}

	form.uploadDir = uploadDir;
	form.keepExtensions = true;

	return new Promise( ( resolve, reject ) => {

		var formData = {}

		form.parse( req, function ( error, fields, files ) {

			if( error ){

				reject( Error( 'contributions/promiseFetchForm/parse(error)/' + error ) )

			}else if ( _.isEmpty( fields ) ){

				reject( Error( 'Form is empty' ) )

			}else{

				// http://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
				//var ip = req.ip

				// https://github.com/indutny/node-ip
				var ip = req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress

				//var ip = "192.168.100.87, 195.90.21.11"
				//http://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node
				var ip_array = ip.split( ',' )

				formData.ip = ip_array[ 0 ]

				formData.fields = fields
				formData.files = files

			}

		} )

		form.on( 'error', function ( error ){

			reject( Error( 'contributions/promiseFetchForm/on(error)/' + error ) )

		} )

		form.on( 'aborted', function ( error ){

			reject( Error( 'contributions/promiseFetchForm/on(aborted)/' + error ) )

		} )

		form.on( 'fileBegin', function ( name, file ){

			var dirname = path.dirname( file.path )			
			file.path = path.join( dirname, file.name ) 

		} )

		form.on( 'end', function ( ){

			resolve( formData )

		} )

	} )

}

const _promiseValidDate = ( formData ) => {

	return new Promise( ( resolve, reject ) => {

		const { fields } = formData
		const { datetime } = fields

		var sql = 'SELECT DATE( ? ) as valid'
		var inserts = [ datetime ]
		var query = mysql.format( sql, inserts )

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				connection.query( query, function ( error, results ) {

					if( error ){

						reject( error )

					}else{

						let res = results[ 0 ].valid;

						if( res ){

							formData.validDate = datetime

						}else{

							formData.validDate = '1000-01-01 00:00:00'

						}
							
						resolve( formData )

					}

					connection.release()

				} )

			}

		} )

	} )

}

const _promiseInsertContribution = ( formData ) => {

	return new Promise( function ( resolve, reject ) {

		const { ip, fields, validDate } = formData
		const { long, lat, manual, corrected, uid, labels, exifdata, material, adaptation, comment, hashtag } = fields
		const point = util.format( 'POINT(%s %s)', long, lat )

		const sanitizedComment = DOMPurify.sanitize( comment )
		const trimmedComment = validator.trim( sanitizedComment )
		const lowComment = validator.stripLow( trimmedComment, true ) //true -> keep new lines
		const escapedComment = validator.escape( lowComment )
		//const linedComment = escapedComment.replace( /(?:\r\n|\r|\n)/g, '\\n' )


		// Truncate table coastwards.contributions
		//(INET6_ATON(?))
		var sql = 'INSERT INTO ??.?? ( ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ?? ) VALUES ( (ST_PointFromText(?)), ?, ?, ?, ?, ?,(INET6_ATON(?)) , ?, ?, ?, ?, ? )'
		//var sql = 'INSERT INTO ??.?? ( ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ?? ) VALUES ( (ST_PointFromText(?)), ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )'
		var inserts = [ 
			'coastwards', 
			'contributions',


			'contribution_point',

			'contribution_point_manual',
			'contribution_point_corrected',
			'contribution_uid',
			'contribution_labels',
			'contribution_exif',
			'contribution_ip',
			'contribution_material',

			'contribution_exif_datetime',
			'contribution_adaptation',
			'contribution_comment',
			'contribution_hashtag',

			point,
			manual,
			corrected,
			uid,
			labels,
			exifdata,
			ip,
			material,


			//CAREFULL!!!!
			validDate,
			adaptation,
			escapedComment,
			hashtag

		]

		var query = mysql.format( sql, inserts )

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				connection.query( query, function ( error, rows ) {

					if( error ){

						reject( error )

					}else{

						formData.insertId = rows.insertId;
						resolve( formData )

					}

					connection.release()

				} )

			}

		} )

	} )

}

router.post( '/upload', ( req, res ) => {

	_promiseFetchForm( req )
	.then( _promiseValidDate )
	.then( _promiseInsertContribution )
	.then( ( formData ) => {

		res.json( { status: 'OK', formData: JSON.stringify( formData ) } )
		return formData;

	} ).catch( ( error ) => {

		res.json( { status: 'KO', message: error.toString() } )

	} )

} )

function promiseFetchGeojson ( ){

	return new Promise( function ( resolve, reject ) {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				// GETS TRUNCATED. WOULD HAVE TO SET: set group_concat_max_len = 100000000; (MAX VALUES: 32-bit: 4294967295, 64-bit: 18446744073709551615)
				// SELECT CONCAT('{ "type": "FeatureCollection", "features": [', GROUP_CONCAT(' { "type": "Feature", "geometry": ', ST_AsGeoJSON(contribution_point), ', "properties": { "marker-symbol": "marker-primary-dark", "comment": "This is a comment", "image": "./uploads/',contribution_filename,'" } } '), '] }' ) as geojson FROM contributions
				//var query = 'SET group_concat_max_len = 100000000; SELECT CONCAT( \'{ "type": "FeatureCollection", "features": [\', GROUP_CONCAT(\' { "type": "Feature", "geometry": \', ST_AsGeoJSON(contribution_point), \', "properties": { "id": "\',contribution_id,\'", "marker-symbol": "marker-accent", "comment": "\',IFNULL(contribution_comment, "" ),\'", "material": "\',IFNULL(contribution_material, "" ),\'","datetime": "\',IFNULL(contribution_exif_datetime, "" ),\'","verified": "\',contribution_verified,\'", "image": "./uploads/\',contribution_uid,\'.jpg" } } \'), \'] }\' ) as geojson FROM contributions';
				var query = 'SET group_concat_max_len = 100000000; SELECT CONCAT( \'{ "type": "FeatureCollection", "features": [\', GROUP_CONCAT(\' { "type": "Feature", "geometry": \', ST_AsGeoJSON(contribution_point), \', "properties": { "id": "\',contribution_id,\'", "materialverified": "\',IFNULL(contribution_material_verified, "notset" ),\'" } } \'), \'] }\' ) as geojson FROM contributions';
				//var query = 'SET group_concat_max_len = 100000000; SELECT CONCAT( \'{ "type": "FeatureCollection", "features": [\', GROUP_CONCAT(\' { "type": "Feature", "geometry": \', ST_AsGeoJSON(contribution_point), \', "properties": { "id": "\',contribution_id,\'", "material": "\',IFNULL(contribution_material, "" ),\'" } } \'), \'] }\' ) as geojson FROM contributions';
				//SELECT CONCAT( '{ "type": "FeatureCollection", "features": [', GROUP_CONCAT(' { "type": "Feature", "geometry": ', ST_AsGeoJSON(contribution_point), ', "properties": { "id": "',contribution_id,'", "material_verified": "',IFNULL(contribution_material_verified, "notset" ),'" } } '), '] }' ) as geojson FROM contributions
				// SET group_concat_max_len = 100000000; SELECT CONCAT( '{ "type": "FeatureCollection", "features": [', GROUP_CONCAT(' { "type": "Feature", "geometry": ', ST_AsGeoJSON(contribution_point), ', "properties": { "marker-symbol": "marker-primary-dark", "comment": "',IFNULL(contribution_comment, "" ),'", "material": "',IFNULL(contribution_material, "" ),'","datetime": "',IFNULL(contribution_exif_datetime, "" ),'","verified": "',contribution_verified,'", "image": "./uploads/',contribution_uid,'.jpg" } } '), '] }' ) as geojson FROM contributions


				connection.query( query, function ( err, results ) {

					if( error ){

						reject( error )

					}else{

						if( results[ 1 ][ 0 ].geojson === undefined ){

							reject( Error( 'contributions/promiseFetchGeojson/Could not read result from query (Update schema?)' ) )

						}else{

							resolve( results[ 1 ][ 0 ].geojson )

						}

					}
					
					connection.release()

				} )

			}

		} )

	} )

}

router.get( '/geojson', function ( req, res ) {

	promiseFetchGeojson()
	.then( JSON.parse )
	.then( ( geojson ) => {

		res.json( { status: 'OK', json: geojson } )
		return geojson;

	} )
	.catch( ( error ) => {

		res.json( { status: 'KO', message: error.toString() } )

	} )

} )

function promiseFetchCount ( ){

	return new Promise( function ( resolve, reject ) {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var query = 'SELECT COUNT(*) as count from contributions'

				connection.query( query, function ( err, results ) {

					if( error ){

						reject( error )

					}else{

						if( results[ 0 ] === undefined ){

							reject( Error( 'contributions/promiseFetchCount/Could not read result from query (Update schema?)' ) )

						}else{

							resolve( results[ 0 ].count )

						}

					}
					
					connection.release()

				} )

			}

		} )

	} )

}

router.get( '/count', function ( req, res ) {

	promiseFetchCount()
	.then( ( count ) => {

		res.json( { status: 'OK', count: count } )
		return count;

	} )
	.catch( ( error ) => {

		res.json( { status: 'KO', message: error.toString() } )

	} )

} )

function promiseFetchIntro ( ){

	return new Promise( function ( resolve, reject ) {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				//var query = 'SELECT GROUP_CONCAT(contribution_uid) as uids from contributions WHERE contribution_intro="1" ORDER BY RAND()'

				var query = 'SELECT contribution_uid from contributions WHERE contribution_intro="1" ORDER BY RAND() LIMIT 30'

				connection.query( query, function ( err, results ) {

					if( error ){

						reject( error )

					}else{

						if( results === undefined ){

							reject( Error( 'contributions/promiseFetchIntro/Could not read result from query (Update schema?)' ) )

						}else{

							resolve( results )

						}

					}
					
					connection.release()

				} )

			}

		} )

	} )

}

router.get( '/intro', function ( req, res ) {

	promiseFetchIntro()
	.then( ( intro ) => {

		res.json( { status: 'OK', intro: intro } )
		return intro;

	} )
	.catch( ( error ) => {

		res.json( { status: 'KO', message: error.toString() } )

	} )

} )


function promiseFetchContribution ( id ){

	return new Promise( function ( resolve, reject ) {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var sql = 'SELECT ??, ??, ??, ??, ??, ??, ??, ??, ?? FROM ?? WHERE ??=?'
				var inserts = [

					"contribution_uid",
					"contribution_comment",
					"contribution_verified",
					"contribution_material",
					"contribution_material_verified",
					"contribution_exif_datetime",
					"contribution_point",
					"contribution_id",
					"contribution_hashtag",

					"contributions",

					"contribution_id",
					id

				]

				var query = mysql.format( sql, inserts )

				connection.query( query, function ( err, results ) {

					if( error ){

						reject( error )

					}else{

						if( results[ 0 ] === undefined ){

							reject( Error( 'contributions/promiseFetchContribution/Could not read result from query (Update schema?)' ) )

						}else{

							resolve( results[ 0 ] )

						}

					}
					
					connection.release()

				} )

			}

		} )

	} )

}

router.get( '/:contribution_id', function ( req, res ) {

	promiseFetchContribution( req.params.contribution_id )
	.then( ( json ) => {

		res.json( { status: 'OK', json: json } )
		return json;

	} )
	.catch( ( error ) => {

		res.json( { status: 'KO', message: error.toString() } )

	} )

} )


module.exports = router;