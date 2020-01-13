const express = require( 'express' )
const router = express.Router()
const mysql = require( 'mysql' )
const formidable = require( 'formidable' )
const fetch = require( 'node-fetch' ) 
//const query_overpass = require( 'query-overpass' )
// For node 7+
var os = require( 'os' ); 
os.tmpDir = os.tmpdir;


const path = require( 'path' )
const fs = require( 'fs' )
const _ = require( 'underscore' )
const util = require( 'util' )
const validator = require( 'validator' )

const xss = require( 'xss' )

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

const UPLOADDIR = path.join( __dirname, '../public/uploads' )

const _promiseFetchForm = ( req ) => {

	var form = new formidable.IncomingForm()
	// var uploadDir = path.join( __dirname, '../public/uploads' )

	if ( !fs.existsSync( UPLOADDIR ) ){

		fs.mkdirSync( UPLOADDIR )

	}

	form.uploadDir = UPLOADDIR;
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
				var remoteAddress = req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress

				//var ip = "192.168.100.87, 195.90.21.11"
				//http://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node
				var ip_array = remoteAddress.split( ',' )
				var ip = ip_array[ 0 ]

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

const _promiseLabels = ( formData ) => {

	return new Promise( ( resolve, reject ) => {

		const { fields, files } = formData
		const { labels } = fields

		if( labels ){

			formData.labels = labels
			resolve( formData )

		}else{


			const data = JSON.stringify( {

				"requests":[
					{
						"image": { "source": {

							imageUri: 'http://coastwards.org/uploads/' + files.file.name
							// imageUri: 'http://coastwards.org/uploads/61688e90-cbed-11e8-a630-7d60b7289fc1.jpg'

						} },
						"features":[
							{
								"type":"LABEL_DETECTION"
							},
							{
								"type":"SAFE_SEARCH_DETECTION"
							}

						]
					}
				]
			} )

			fetch( 'https://vision.googleapis.com/v1/images:annotate?fields=responses&key=' + process.env.GOOGLE_API_KEY_SERVER, {

				method: 'POST',
				body: data,

			} )
				.then( ( response ) => response.json() )
				.then( ( responseJson ) => {

					if ( responseJson.responses ) {

						const annotations = responseJson.responses[ 0 ]

						if( _.contains( annotations.safeSearchAnnotation, 'LIKELY' ) || _.contains( annotations.safeSearchAnnotation, 'VERY_LIKELY' ) ){
						
							reject( 'spam_detected' )

						}

						formData.labels = JSON.stringify( annotations.labelAnnotations )
						resolve( formData )
						return formData

					} else {

						reject( responseJson.error.message ) 

						return formData

					}

				} )
				.catch( ( error ) => {

					reject( error ) 

				} )

		}

	} )

}

const _promiseInsertContribution = ( formData ) => {

	return new Promise( function ( resolve, reject ) {

		const { ip, fields, validDate, labels } = formData
		const { long, lat, manual, corrected, uid, exifdata, material, source, adaptation, comment, hashtag } = fields
		const point = util.format( 'POINT(%s %s)', long, lat )

		const sanitizedComment = xss( comment )
		const trimmedComment = validator.trim( sanitizedComment )
		const lowComment = validator.stripLow( trimmedComment, true ) //true -> keep new lines
		const escapedComment = validator.escape( lowComment )
		//const linedComment = escapedComment.replace( /(?:\r\n|\r|\n)/g, '\\n' )

		// Truncate table coastwards.contributions
		//(INET6_ATON(?))
		var sql = 'INSERT INTO ??.?? ( ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ?? ) VALUES ( (ST_PointFromText(?)), ?, ?, ?, ?, ?,(INET6_ATON(?)), ? , ?, ?, ?, ?, ? )'
		//var sql = 'INSERT INTO ??.?? ( ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ?? ) VALUES ( (ST_PointFromText(?)), ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )'
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
			'contribution_source',

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
			source,


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
		.then( _promiseLabels )
		.then( _promiseInsertContribution )
		.then( ( formData ) => {

			res.json( { status: 'OK', formData: JSON.stringify( formData ) } )
			return formData;

		} ).catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )

function _promiseFetchGeojson ( ){

	return new Promise( function ( resolve, reject ) {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				// GETS TRUNCATED. WOULD HAVE TO SET: set group_concat_max_len = 100000000; (MAX VALUES: 32-bit: 4294967295, 64-bit: 18446744073709551615)
				// SELECT CONCAT('{ "type": "FeatureCollection", "features": [', GROUP_CONCAT(' { "type": "Feature", "geometry": ', ST_AsGeoJSON(contribution_point), ', "properties": { "marker-symbol": "marker-primary-dark", "comment": "This is a comment", "image": "./uploads/',contribution_filename,'" } } '), '] }' ) as geojson FROM contributions
				//var query = 'SET group_concat_max_len = 100000000; SELECT CONCAT( \'{ "type": "FeatureCollection", "features": [\', GROUP_CONCAT(\' { "type": "Feature", "geometry": \', ST_AsGeoJSON(contribution_point), \', "properties": { "id": "\',contribution_id,\'", "marker-symbol": "marker-accent", "comment": "\',IFNULL(contribution_comment, "" ),\'", "material": "\',IFNULL(contribution_material, "" ),\'","datetime": "\',IFNULL(contribution_exif_datetime, "" ),\'","verified": "\',contribution_verified,\'", "image": "./uploads/\',contribution_uid,\'.jpg" } } \'), \'] }\' ) as geojson FROM contributions';
				var query = 'SET group_concat_max_len = 100000000; SELECT CONCAT( \'{ "type": "FeatureCollection", "features": [\', GROUP_CONCAT(\' { "type": "Feature", "geometry": \', ST_AsGeoJSON(contribution_point), \', "properties": { "id": "\',contribution_id,\'", "materialverified": "\',IFNULL(contribution_material_verified, "notset" ),\'" } } \'), \'] }\' ) as geojson FROM contributions WHERE contribution_material_verified !="notsure"';
				//var query = 'SET group_concat_max_len = 100000000; SELECT CONCAT( \'{ "type": "FeatureCollection", "features": [\', GROUP_CONCAT(\' { "type": "Feature", "geometry": \', ST_AsGeoJSON(contribution_point), \', "properties": { "id": "\',contribution_id,\'", "material": "\',IFNULL(contribution_material, "" ),\'" } } \'), \'] }\' ) as geojson FROM contributions';
				//SELECT CONCAT( '{ "type": "FeatureCollection", "features": [', GROUP_CONCAT(' { "type": "Feature", "geometry": ', ST_AsGeoJSON(contribution_point), ', "properties": { "id": "',contribution_id,'", "material_verified": "',IFNULL(contribution_material_verified, "notset" ),'" } } '), '] }' ) as geojson FROM contributions
				// SET group_concat_max_len = 100000000; SELECT CONCAT( '{ "type": "FeatureCollection", "features": [', GROUP_CONCAT(' { "type": "Feature", "geometry": ', ST_AsGeoJSON(contribution_point), ', "properties": { "marker-symbol": "marker-primary-dark", "comment": "',IFNULL(contribution_comment, "" ),'", "material": "',IFNULL(contribution_material, "" ),'","datetime": "',IFNULL(contribution_exif_datetime, "" ),'","verified": "',contribution_verified,'", "image": "./uploads/',contribution_uid,'.jpg" } } '), '] }' ) as geojson FROM contributions


				connection.query( query, function ( error, results ) {

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

	_promiseFetchGeojson()
		.then( JSON.parse )
		.then( ( geojson ) => {

			res.json( { status: 'OK', json: geojson } )
			return geojson;

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )

function _promiseFetchGeojsonLive ( ){

	return new Promise( function ( resolve, reject ) {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				// GETS TRUNCATED. WOULD HAVE TO SET: set group_concat_max_len = 100000000; (MAX VALUES: 32-bit: 4294967295, 64-bit: 18446744073709551615)
				// SELECT CONCAT('{ "type": "FeatureCollection", "features": [', GROUP_CONCAT(' { "type": "Feature", "geometry": ', ST_AsGeoJSON(contribution_point), ', "properties": { "marker-symbol": "marker-primary-dark", "comment": "This is a comment", "image": "./uploads/',contribution_filename,'" } } '), '] }' ) as geojson FROM contributions
				//var query = 'SET group_concat_max_len = 100000000; SELECT CONCAT( \'{ "type": "FeatureCollection", "features": [\', GROUP_CONCAT(\' { "type": "Feature", "geometry": \', ST_AsGeoJSON(contribution_point), \', "properties": { "id": "\',contribution_id,\'", "marker-symbol": "marker-accent", "comment": "\',IFNULL(contribution_comment, "" ),\'", "material": "\',IFNULL(contribution_material, "" ),\'","datetime": "\',IFNULL(contribution_exif_datetime, "" ),\'","verified": "\',contribution_verified,\'", "image": "./uploads/\',contribution_uid,\'.jpg" } } \'), \'] }\' ) as geojson FROM contributions';
				var query = 'SET group_concat_max_len = 100000000; SELECT CONCAT( \'{ "type": "FeatureCollection", "features": [\', GROUP_CONCAT(\' { "type": "Feature", "geometry": \', ST_AsGeoJSON(contribution_point), \', "properties": { "id": "\',contribution_id,\'", "timestamp": "\',contribution_timestamp,\'", "marker-symbol": "marker-accent-flat", "materialverified": "\',IFNULL(contribution_material_verified, "notset" ),\'" } } \'), \'] }\' ) as geojson FROM contributions WHERE contribution_material_verified !="notsure" AND `contribution_timestamp` >= addtime(now(), "-00:05:00")';
				//var query = 'SET group_concat_max_len = 100000000; SELECT CONCAT( \'{ "type": "FeatureCollection", "features": [\', GROUP_CONCAT(\' { "type": "Feature", "geometry": \', ST_AsGeoJSON(contribution_point), \', "properties": { "id": "\',contribution_id,\'", "material": "\',IFNULL(contribution_material, "" ),\'" } } \'), \'] }\' ) as geojson FROM contributions';
				//SELECT CONCAT( '{ "type": "FeatureCollection", "features": [', GROUP_CONCAT(' { "type": "Feature", "geometry": ', ST_AsGeoJSON(contribution_point), ', "properties": { "id": "',contribution_id,'", "material_verified": "',IFNULL(contribution_material_verified, "notset" ),'" } } '), '] }' ) as geojson FROM contributions
				// SET group_concat_max_len = 100000000; SELECT CONCAT( '{ "type": "FeatureCollection", "features": [', GROUP_CONCAT(' { "type": "Feature", "geometry": ', ST_AsGeoJSON(contribution_point), ', "properties": { "marker-symbol": "marker-primary-dark", "comment": "',IFNULL(contribution_comment, "" ),'", "material": "',IFNULL(contribution_material, "" ),'","datetime": "',IFNULL(contribution_exif_datetime, "" ),'","verified": "',contribution_verified,'", "image": "./uploads/',contribution_uid,'.jpg" } } '), '] }' ) as geojson FROM contributions


				connection.query( query, function ( error, results ) {

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

router.get( '/geojsonLive', function ( req, res ) {

	_promiseFetchGeojsonLive()
		.then( JSON.parse )
		.then( ( geojson ) => {

			res.json( { status: 'OK', json: geojson } )
			return geojson;

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )


/*function _promiseFetchOSM ( ){

	const sandQuery = '[out:json];(node["natural"="coastline"]["surface"="sand"];way["natural"="coastline"]["surface"="sand"];relation["natural"="coastline"]["surface"="sand"];);out body;>;out skel qt;'
	//const sandQuery = '[out:json];(node["surface"="sand"];way["surface"="sand"];relation["surface"="sand"];);out body;>;out skel qt;'

	return new Promise( function ( resolve, reject ) {

		query_overpass( sandQuery, ( error, data ) => {

			if( error ){

				reject( error )

			} else {

				resolve( data )

			}

		}, { flatProperties: true } )

	} )

}

router.get( '/osm', function ( req, res ) {

	_promiseFetchOSM()
		//.then( JSON.parse )
		.then( ( geojson ) => {

			res.json( { status: 'OK', json: geojson } )
			return geojson;

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )*/

function _promiseFetchAnnotations ( ){

	return new Promise( function ( resolve, reject ) {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var query = 'SELECT contribution_id, Y(contribution_point) AS contribution_longitude, X(contribution_point) AS contribution_latitude, contribution_material_verified FROM contributions';

				connection.query( query, function ( error, results ) {

					if( error ){

						reject( error )

					}else{

						if( results === undefined ){

							reject( Error( 'data/_promiseFetchAnnotations/Could not read result from query (Update schema?)' ) )

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

router.get( '/annotations', function ( req, res ) {

	_promiseFetchAnnotations()
		.then( ( results ) => {

			res.json( { status: 'OK', json: results } )
			return results;

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )

function _promiseFetchCount ( ){

	return new Promise( function ( resolve, reject ) {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var query = 'SELECT COUNT(*) as count from contributions'

				connection.query( query, function ( error, results ) {

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

	_promiseFetchCount()
		.then( ( count ) => {

			res.json( { status: 'OK', count: count } )
			return count;

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )

function _promiseFetchIntro ( ){

	return new Promise( function ( resolve, reject ) {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				//var query = 'SELECT GROUP_CONCAT(contribution_uid) as uids from contributions WHERE contribution_intro="1" ORDER BY RAND()'

				var query = 'SELECT contribution_uid from contributions WHERE contribution_intro="1" ORDER BY RAND() LIMIT 30'

				connection.query( query, function ( error, results ) {

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

	_promiseFetchIntro()
		.then( ( intro ) => {

			res.json( { status: 'OK', intro: intro } )
			return intro;

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )


function _promiseFetchContribution ( id ){

	return new Promise( function ( resolve, reject ) {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var sql = 'SELECT ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ?? FROM ?? WHERE ??=?'
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
					"contribution_source",
					"contribution_reported",

					"contributions",

					"contribution_id",
					id

				]

				var query = mysql.format( sql, inserts )

				connection.query( query, function ( error, results ) {

					if( error ){

						reject( error )

					}else{

						if( results[ 0 ] === undefined ){

							reject( Error( 'contribute/_promiseFetchContribution/Could not read result from query (Update schema?)' ) )

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

	_promiseFetchContribution( req.params.contribution_id )
		.then( ( json ) => {

			res.json( { status: 'OK', json: json } )
			return json;

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )


module.exports = router;