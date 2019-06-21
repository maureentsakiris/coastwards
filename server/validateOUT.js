const express = require( 'express' );
const router = express.Router();

const formidable = require( 'formidable' );
const path = require( 'path' );
const fs = require( 'fs' );
const uuid = require( 'node-uuid' );
const _ = require( 'underscore' );



function promiseFetchForm ( req ) {

	var form = new formidable.IncomingForm();
	var uploadDir = path.join( __dirname, './validate' );

	if ( !fs.existsSync( uploadDir ) ){

		fs.mkdirSync( uploadDir );

	}

	form.uploadDir = uploadDir;
	form.keepExtensions = true;

	return new Promise( ( resolve, reject ) => {

		var formData = {};

		form.parse( req, function ( error, fields, files ) {

			if( error ){

				reject( Error( 'contributions/promiseFetchForm/parse(error)/' + error ) );

			}else if ( _.isEmpty( fields ) ){

				reject( Error( 'Form is empty' ) );

			}else{

				formData.fields = fields;
				formData.files = files;

			}

		} );

		form.on( 'error', function ( error ){

			reject( Error( 'contributions/promiseFetchForm/on(error)/' + error ) );

		} );

		form.on( 'aborted', function ( error ){

			reject( Error( 'contributions/promiseFetchForm/on(aborted)/' + error ) );

		} );

		form.on( 'fileBegin', function ( name, file ){

			var uid = uuid.v1();
			var dirname = path.dirname( file.path );
			var extension = path.extname( file.path );
			var filename = uid + extension;
			
			file.uid = uid;
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

router.post( '/validate', function ( req, res ) {

	promiseFetchForm( req )
		.then( function ( formData ){

			res.json( { status: 'OK', json: JSON.stringify( formData ) } );
			return formData;

		} ).catch( function ( error ) {

			res.json( { status: 'KO', message: error.toString() } );

		} );

} );


module.exports = router;