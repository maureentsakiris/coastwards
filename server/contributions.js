const express = require( 'express' );
const router = express.Router();
const mysql = require( 'mysql' );
const formidable = require( 'formidable' );
const path = require( 'path' );
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

		form.parse( req, function ( err, fields, files ) {

			if( err ){

				reject( Error( 'contribution/_formidable/parse(error)/' + err ) );

			}

			if ( _.isEmpty( fields ) ){

				reject( Error( 'Form is empty' ) );

			}

			form.fields = fields;

		} );

		form.on( 'error', function ( err ){

			reject( Error( 'contribution/_formidable/on(error)/' + err ) );

		} );

		form.on( 'aborted', function ( err ){

			reject( Error( 'contribution/_formidable/on(aborted)/' + err ) );

		} );

		form.on( 'end', function ( ){

			resolve( this );

		} );

	} );

}

function resizeFile ( form ){

	return new Promise( function ( resolve, reject ) {


		console.log( form );
		var file = form.openedFiles[ 0 ];

		jimp.read( file.path, function ( error, jimpFile ){

			if( error ){

				reject( Error( 'contributions/resizeFile/readError/' + error ) );

			}

			var dirname = path.dirname( file.path );
			var extension = path.extname( file.path );
			var basename = path.basename( file.path, extension );
			var fileSmall = path.join( dirname, basename + '-small.jpg' );

			jimpFile.scaleToFit( 800, 800 ).quality( 80 ).write( fileSmall, function ( ){

				resolve( fileSmall ); // <-- WHAT IF THIS FAILS TO BE CALLED????

			} );

		} );

	} );

}

function insertFile ( form, ip ) {

	return Promise.resolve( form.fields );

}


router.post( '/upload', function ( req, res ) {

	var ip = req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress;

	fetchForm( req ).then( function ( form ){

		return Promise.all( [ resizeFile( form ), insertFile( form, ip ) ] ).then( function ( values ){

			res.json( { status: 'OK', values: values } );
			return values;

		} ).catch( function ( error ) {

			throw error;

		} );

	} ).catch( function ( error ) {

		console.log( error );
		res.json( { status: 'KO', error: error.toString() } );

	} );

	/*var insertDB = insertFile( req );

	Promise.all( [ handleFile, insertDB ] ).then( function ( values ){

		res.send( 'Well done!' );
		return values;

	} ).catch( function ( error ) {

		res.send( error );

	} );*/



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