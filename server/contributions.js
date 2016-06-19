const express = require( 'express' );
const router = express.Router();
const mysql = require( 'mysql' );
const formidable = require( 'formidable' );
const path = require( 'path' );
const uuid = require( 'node-uuid' );
const jimp = require( 'jimp' );
const _ = require( 'underscore' );
const util = require( 'util' );

const globalConfig = require ( '../config/development.json' )

const pool  = mysql.createPool( globalConfig.mysql );

function promiseFetchForm ( req ) {

	var form = new formidable.IncomingForm();
	form.uploadDir = path.join( __dirname, '../public/uploads' );
	form.keepExtensions = true;

	return new Promise( ( resolve, reject ) => {

		var formData = {};

		form.parse( req, function ( error, fields, files ) {

			if( error ){

				reject( Error( 'contributions/promiseFetchForm/parse(error)/' + error ) );

			}

			if ( _.isEmpty( fields ) ){

				reject( Error( 'Form is empty' ) );

			}

			// http://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
			var ip = req.ip;
			formData.ip = ip;

			formData.fields = fields;
			formData.files = files;

		} );

		form.on( 'error', function ( error ){

			reject( Error( 'contributions/promiseFetchForm/on(error)/' + error ) );

		} );

		form.on( 'aborted', function ( error ){

			reject( Error( 'contributions/promiseFetchForm/on(aborted)/' + error ) );

		} );

		form.on( 'fileBegin', function ( name, file ){

			var id = uuid.v1();
			var dirname = path.dirname( file.path );
			var extension = path.extname( file.path );
			var filename = id + extension;
			
			file.uuid = id;
			file.dirname = dirname;
			file.extension = extension;
			file.filename = filename;
			file.path = path.join( dirname, filename );

		} );

		form.on( 'end', function ( ){

			resolve( formData );

		} );

	} );

}

function promiseInsertFile ( formData ) {

	// Maybe later we can iterate through multiple drops
	var drop = 'dropzone[0]';

	var ip = formData.ip;
	var long = formData.fields[ drop + '.validations.imageHasLocation.result.specs.long' ];
	var lat = formData.fields[ drop + '.validations.imageHasLocation.result.specs.lat' ];
	var validationsJSON = formData.fields[ drop + '.validationsJSON' ];
	var exifJSON = formData.fields[ drop + '.exifJSON' ];
	var manual = formData.fields[ drop + '.manual' ];
	var exifDateTime = formData.fields[ drop + '.exifDateTime' ];

	var filename = formData.files[ drop + '.file' ].filename;

	var point = util.format( 'POINT(%s %s)', long, lat )

	return new Promise( function ( resolve, reject ) {

		// Truncate table coastwards.contributions
		var sql = 'INSERT INTO ??.?? ( ??, ??, ??, ??, ??, ??, ?? ) VALUES ( (ST_PointFromText(?)), ?, ?, ?, ?, ?, ? )';
		var inserts = [ 
			'coastwards', 
			'contributions',

			'contribution_point',
			'contribution_point_manual',
			'contribution_filename',
			'contribution_exif_datetime',
			'contribution_validations',
			'contribution_exif',
			'contribution_ip',

			point,
			manual,
			filename,
			exifDateTime,
			validationsJSON,
			exifJSON,
			ip

		]

		var query = mysql.format( sql, inserts );

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error );

			}

			connection.query( query, function ( error, rows ) {

				if( error ){

					reject( error );

				}else{

					formData.insertId = rows.insertId;
					resolve( formData );

				}

				connection.release();

			} );

		} );

	} );

}

function promiseResizeFile ( formData ){

	var drop = 'dropzone[0]';

	return new Promise( function ( resolve, reject ) {

		var file = formData.files[ drop + '.file' ];

		jimp.read( file.path, function ( error, jimpFile ){

			if( error ){

				reject( Error( 'contributions/promiseResizeFile/readError/' + error ) );

			}

			var dirname = path.dirname( file.path );
			var extension = path.extname( file.path );
			var basename = path.basename( file.path, extension );
			var fileSmall = path.join( dirname, basename + '-small.jpg' );

			jimpFile.scaleToFit( 800, 800 ).quality( 80 ).write( fileSmall, function ( ){

				file.fileSmall = fileSmall;
				resolve( formData ); // <-- WHAT IF THIS FAILS TO BE CALLED????

			} );

		} );

	} );

}


router.post( '/upload', function ( req, res ) {

	promiseFetchForm( req )
	.then( promiseInsertFile )
	.then( promiseResizeFile )
	.then( function ( formData ){

		res.json( { status: 'OK', json: JSON.stringify( formData ) } );
		return formData;

	} ).catch( function ( error ) {

		res.json( { status: 'KO', message: error.toString() } );

	} );

} );


function promiseFetchGeojson ( ){

	return new Promise( function ( resolve, reject ) {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				return reject( error );

			}

			// GETS TRUNCATED. WOULD HAVE TO SET: set group_concat_max_len = 100000000; (MAX VALUES: 32-bit: 4294967295, 64-bit: 18446744073709551615)
			// SELECT CONCAT('{ "type": "FeatureCollection", "features": [', GROUP_CONCAT(' { "type": "Feature", "geometry": ', ST_AsGeoJSON(contribution_point), ', "properties": { "marker-symbol": "marker-primary-dark", "comment": "This is a comment", "image": "./uploads/',contribution_filename,'" } } '), '] }' ) as geojson FROM contributions
			var query = 'SET group_concat_max_len = 100000000; SELECT CONCAT( \'{ "type": "FeatureCollection", "features": [\', GROUP_CONCAT(\' { "type": "Feature", "geometry": \', ST_AsGeoJSON(contribution_point), \', "properties": { "marker-symbol": "marker-primary-dark", "comment": "This is a comment", "image": "./uploads/\',contribution_filename,\'" } } \'), \'] }\' ) as geojson FROM contributions';
			//var query = 'SELECT contribution_point FROM contributions';

			connection.query( query, function ( err, results ) {

				if( error ){

					reject( error );

				}else{

					var row = results[ 1 ][ 0 ];

					if ( row.geojson ){

						var geojson = JSON.parse( row.geojson );
						resolve( geojson );

					}else{

						reject( Error( 'contributions/promiseFetchGeojson/Result did not return geojson' ) );

					}

				}
				
				connection.release();

			} );

		} );

	} );

}

router.get( '/geojson', function ( req, res ) {

	promiseFetchGeojson().then( function ( geojson ){

		res.json( { status: 'OK', json: geojson } );
		return geojson;

	} ).catch( function ( error ){

		res.json( { status: 'KO', message: error.toString() } );

	} );

} );

module.exports = router;