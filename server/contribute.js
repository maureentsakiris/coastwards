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
				var ip = req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress
				/*console.log( "ip", ip );
				console.log( "req.ip", req.ip );
				console.log( "req.ips", req.ips );*/
				formData.ip = ip

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

							formData.validDate = res

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
		const { long, lat, manual, uid, labels, exifdata, material, adaptation, comment, hashtag } = fields
		const point = util.format( 'POINT(%s %s)', long, lat )

		const sanitizedComment = DOMPurify.sanitize( comment )
		const trimmedComment = validator.trim( sanitizedComment )
		const lowComment = validator.stripLow( trimmedComment )
		const escapedComment = validator.escape( lowComment )


		// Truncate table coastwards.contributions
		var sql = 'INSERT INTO ??.?? ( ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ?? ) VALUES ( (ST_PointFromText(?)), ?, ?, ?, ?, (INET6_ATON(?)), ?, ?, ?, ?, ? )'
		var inserts = [ 
			'coastwards', 
			'contributions',


			'contribution_point',

			'contribution_point_manual',
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

		res.send( 'upload_ok' )
		//res.json( { status: 'OK', json: JSON.stringify( formData ) } )
		return formData;

	} ).catch( ( error ) => {

		res.send( error.message )
		//res.json( { status: 'KO', message: error.toString() } )

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
				var query = 'SET group_concat_max_len = 100000000; SELECT CONCAT( \'{ "type": "FeatureCollection", "features": [\', GROUP_CONCAT(\' { "type": "Feature", "geometry": \', ST_AsGeoJSON(contribution_point), \', "properties": { "id": "\',contribution_id,\'", "marker-symbol": "marker-accent", "comment": "\',IFNULL(contribution_comment, "" ),\'", "material": "\',IFNULL(contribution_material, "" ),\'","datetime": "\',IFNULL(contribution_exif_datetime, "" ),\'","verified": "\',contribution_verified,\'", "image": "./uploads/\',contribution_uid,\'.jpg" } } \'), \'] }\' ) as geojson FROM contributions';
				
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
	.then( function ( geojson ){

		res.json( { status: 'OK', json: geojson } )
		return geojson;

	} ).catch( function ( error ){

		res.json( { status: 'KO', message: error.toString() } )

	} )

} )

module.exports = router;