const express = require( 'express' )
const router = express.Router()
const mysql = require( 'mysql' )
const formidable = require( 'formidable' )
const path = require( 'path' )
const fs = require( 'fs' )
const uuid = require( 'node-uuid' )
const jimp = require( 'jimp' )
const _ = require( 'underscore' )
const util = require( 'util' )

const globalConfigs = require ( '../config/' )
const config = globalConfigs.mysql;

const pool  = mysql.createPool( {

	host: config.host,
	user: config.user,	
	password: config.password,
	database : config.database,
	multipleStatements: true

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
				var ip = req.ip
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

			var uid = uuid.v1()
			var dirname = path.dirname( file.path )
			var extension = path.extname( file.path )
			var filename = uid + extension;
			
			file.uid = uid
			file.path = path.join( dirname, filename ) 

		} )

		form.on( 'end', function ( ){

			resolve( formData )

		} )

	} )

}

const _promiseInsertFile = ( formData ) => {

	return new Promise( function ( resolve, reject ) {

		const { ip, fields } = formData
		const { long, lat, manual, datetime, labels, exifdata, material, adaptation, comment, hashtag } = fields
		const uid = formData.files.file.uid
		const point = util.format( 'POINT(%s %s)', long, lat )

		

		// Truncate table coastwards.contributions
		var sql = 'INSERT INTO ??.?? ( ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ?? ) VALUES ( (ST_PointFromText(?)), ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )'
		var inserts = [ 
			'coastwards', 
			'contributions',


			'contribution_point',

			'contribution_point_manual',
			'contribution_uid',
			'contribution_exif_datetime',
			'contribution_labels',
			'contribution_exif',
			'contribution_ip',
			'contribution_material',
			'contribution_adaptation',
			'contribution_comment',
			'contribution_hashtag',

			point,
			manual,
			uid,
			datetime,
			labels,
			exifdata,
			ip,
			material,
			adaptation,
			comment,
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

	// Maybe later we can iterate through multiple drops
	/*var drop = 'dropzone[0]';

	var ip = formData.ip;
	var long = formData.fields[ drop + '.validations.imageHasLocation.result.specs.long' ];
	var lat = formData.fields[ drop + '.validations.imageHasLocation.result.specs.lat' ];
	var validationsJSON = formData.fields[ drop + '.validationsJSON' ];
	var exifJSON = formData.fields[ drop + '.exifJSON' ];
	var manual = formData.fields[ drop + '.manual' ];
	var exifDateTime = formData.fields[ drop + '.exifDateTime' ];
	var filename = formData.files[ drop + '.file' ].filename;
	var uid = formData.files[ drop + '.file' ].uid;
	var comment = formData.fields[ drop + '.comment' ];
	var material = formData.fields[ drop + '.material' ];
	var adaptation = formData.fields[ drop + '.adaptation' ];

	var point = util.format( 'POINT(%s %s)', long, lat )

	return new Promise( function ( resolve, reject ) {

		// Truncate table coastwards.contributions
		var sql = 'INSERT INTO ??.?? ( ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ?? ) VALUES ( (ST_PointFromText(?)), ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )';
		var inserts = [ 
			'coastwards', 
			'contributions',

			'contribution_point',
			'contribution_point_manual',
			'contribution_filename',
			'contribution_uid',
			'contribution_exif_datetime',
			'contribution_validations',
			'contribution_exif',
			'contribution_ip',
			'contribution_comment',
			'contribution_material',
			'contribution_adaptation',

			point,
			manual,
			filename,
			uid,
			exifDateTime,
			validationsJSON,
			exifJSON,
			ip,
			comment,
			material,
			adaptation

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

	} )*/

}

function promiseResizeFile ( formData ){

	var drop = 'dropzone[0]';

	return new Promise( function ( resolve, reject ) {

		var file = formData.files[ drop + '.file' ];

		jimp.read( file.path, function ( error, jimpFile ){

			if( error ){

				reject( Error( 'contributions/promiseResizeFile/readError/' + error ) )

			}else{

				var dirname = path.dirname( file.path )
				var extension = path.extname( file.path )
				var basename = path.basename( file.path, extension )
				var fileSmall = path.join( dirname, basename + '-small.jpg' )

				jimpFile.scaleToFit( 800, 800 ).quality( 80 ).write( fileSmall, function ( ){

					file.fileSmall = fileSmall;
					resolve( formData ) // <-- WHAT IF THIS FAILS TO BE CALLED????

				} )

			}

		} )

	} )

}


router.post( '/upload', ( req, res ) => {

	_promiseFetchForm( req )
	.then( _promiseInsertFile )
	/*.then( promiseResizeFile )*/
	.then( ( formData ) => {

		res.send( 'status_upload_ok' )
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
				var query = 'SET group_concat_max_len = 100000000; SELECT CONCAT( \'{ "type": "FeatureCollection", "features": [\', GROUP_CONCAT(\' { "type": "Feature", "geometry": \', ST_AsGeoJSON(contribution_point), \', "properties": { "marker-symbol": "marker-primary-dark", "comment": "\',IFNULL(contribution_comment, "" ),\'", "material": "\',IFNULL(contribution_material, "" ),\'","datetime": "\',IFNULL(contribution_exif_datetime, "" ),\'","verified": "\',contribution_verified,\'", "image": "./uploads/\',contribution_uid,\'.jpg" } } \'), \'] }\' ) as geojson FROM contributions';
				//var query = 'SELECT contribution_point FROM contributions';

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