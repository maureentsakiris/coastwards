const express = require( 'express' );
const router = express.Router();
const mysql = require( 'mysql' );
const formidable = require( 'formidable' );
const path = require( 'path' );
const uuid = require( 'node-uuid' );
const jimp = require( 'jimp' );
const _ = require( 'underscore' );

const pool  = mysql.createPool( {

	host: 'localhost',
	user: 'root',	
	password: 'c0a37ward3!',
	database : 'coastwards'

} );

function fetchForm ( req ) {

	var form = new formidable.IncomingForm();
	form.uploadDir = path.join( __dirname, '../public/uploads' );
	form.keepExtensions = true;

	return new Promise( ( resolve, reject ) => {

		var formData = {};

		form.parse( req, function ( error, fields, files ) {

			if( error ){

				reject( Error( 'contribution/_formidable/parse(error)/' + error ) );

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

			reject( Error( 'contribution/_formidable/on(error)/' + error ) );

		} );

		form.on( 'aborted', function ( error ){

			reject( Error( 'contribution/_formidable/on(aborted)/' + error ) );

		} );

		form.on( 'fileBegin', function ( name, file ){

			//var filename = path.basename( file.path );
			var dirname = path.dirname( file.path );
			var extension = path.extname( file.path );
			var id = uuid.v1();
			var filename = id + extension;
			file.filename = filename;
			file.dirname = dirname;
			file.path = path.join( dirname, filename );
			file.uuid = id;

		} );

		form.on( 'end', function ( ){

			resolve( formData );

		} );

	} );

}

function insertFile ( formData ) {

	var drop = 'dropzone[0]';

	var ip = formData.ip;
	var long = formData.fields[ drop + '.validations.imageHasLocation.result.specs.long' ];
	var lat = formData.fields[ drop + '.validations.imageHasLocation.result.specs.lat' ];
	var validationsJSON = formData.fields[ drop + '.validationsJSON' ];
	var exifJSON = formData.fields[ drop + '.exifJSON' ];
	var manual = formData.fields[ drop + '.manual' ];
	var exifDateTime = formData.fields[ drop + '.exifDateTime' ];

	var filename = formData.files[ drop + '.file' ].filename;
	var dirname = formData.files[ drop + '.file' ].dirname;

	return new Promise( function ( resolve, reject ) {

		// Truncate table coastwards.contributions
		//INSERT INTO `coastwards_schema`.`contributions` (`contribution_filename`, `contribution_ip`, `contribution_long`, `contribution_lat`, `contribution_location_manual`) VALUES ('03.jpg', 'office', 'asdf', 'sadf', '0');
		var sql = 'INSERT INTO ??.?? ( ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)';
		var inserts = [ 
			'coastwards', 
			'contributions',
			'contribution_ip',
			'contribution_filename',
			'contribution_dirname',
			'contribution_long', 
			'contribution_lat', 
			'contribution_location_manual',
			'contribution_exif_time_date',
			'contribution_validations_json',
			'contribution_exif_json',
			ip,
			filename,
			dirname,
			long,
			lat,
			manual,
			exifDateTime,
			validationsJSON,
			exifJSON

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

function resizeFile ( formData ){

	var drop = 'dropzone[0]';

	return new Promise( function ( resolve, reject ) {

		var file = formData.files[ drop + '.file' ];

		jimp.read( file.path, function ( error, jimpFile ){

			if( error ){

				reject( Error( 'contributions/resizeFile/readError/' + error ) );

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

	fetchForm( req ).then( function ( formData ){

		return insertFile( formData );

	} ).then( function ( formData ) {

		return resizeFile( formData );

	} ).then( function ( formData ){

		res.json( { status: 'OK', message: JSON.stringify( formData ) } );
		return formData;

	} ).catch( function ( error ) {

		console.log( error );
		res.json( { status: 'KO', message: error.toString() } );

	} );


	/*function insertDB ( ) {


		Promise.reject( 'Contribution inserted ' );

		var contribution = req.body.dropzone[ 0 ];
		var ip = req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress;
		var coords = contribution.imageHasLocation.result.specs;

		//INSERT INTO `coastwards_schema`.`contributions` (`contribution_filename`, `contribution_ip`, `contribution_long`, `contribution_lat`, `contribution_location_manual`) VALUES ('03.jpg', 'office', 'asdf', 'sadf', '0');
		var sql = 'INSERT INTO ??.?? ( ??, ??, ??, ??, ??) VALUES ( ?, ?, ?, ?, ?)';
		var inserts = [ 
			'coastwards', 
			'contributions', 
			'contribution_filename', 
			'contribution_ip', 
			'contribution_long', 
			'contribution_lat', 
			'contribution_location_manual',
			contribution.name,
			ip,
			coords.long,
			coords.lat,
			0

		]

		var query = mysql.format( sql, inserts );

		pool.getConnection( function ( err, connection ) {

			// Use the connection 
			connection.query( query, function ( err, rows ) {

				if( err ){

					res.send( err );

				}else{

					console.log( rows )
					res.json( rows );

				}

				connection.release();

			} );

		} );


	}*/

} );


router.get( '/geojson', function ( req, res ) {

	/*pool.getConnection( function ( err, connection ) {

		connection.query( 'SELECT * FROM contributions_schema', function ( err, rows ) {

			res.json( rows );
			connection.release();

		} );

	} );*/

} );

module.exports = router;