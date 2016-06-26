const mysql = require( 'mysql' );
const fs = require( 'fs' );
const path = require( 'path' );

var connection = mysql.createConnection( {

	host: 'localhost',
	user: 'root',	
	password: 'c0a37ward3!',
	database : 'coastwards',
	multipleStatements: true

} );

var deleteFolderRecursive = function ( path ) {

	if( fs.existsSync( path ) ) {

		fs.readdirSync( path ).forEach( function ( file ){

			var curPath = path + "/" + file;
			if( fs.lstatSync( curPath ).isDirectory() ) { // recurse

				deleteFolderRecursive( curPath );

			} else { // delete file

				fs.unlinkSync( curPath );

			}

		} );

		fs.rmdirSync( path );

	}

};


function _promiseTruncate (){

	return new Promise( ( resolve, reject ) => {

		connection.query( 'TRUNCATE TABLE contributions', function ( err, rows ) {

			if ( err ) {

				reject( 'Error connecting to database: ' + err.stack );

			}else{

				connection.destroy();	
				resolve( 'Truncated database' );

			}

		} );


	} );

}

function _promiseRemoveUploads (){

	var uploadDir = path.join( __dirname, '/public/uploads' );

	return new Promise( ( resolve, reject ) => {

		fs.access( uploadDir, fs.F_OK, function ( err ) {

			if ( err ) {
				
				resolve( "Did not remove upload directory because it doesn't exist" );

			} else {

				deleteFolderRecursive( uploadDir );
				resolve( 'Removed upload directory' );

			}

		} );

	} );

}

return Promise.all( [ _promiseTruncate(), _promiseRemoveUploads() ] ).then( ( values ) => {

	console.log( values[ 0 ] );
	console.log( values[ 1 ] );
	return values;

} ).catch( ( error ) => {

	console.log( error );

} );