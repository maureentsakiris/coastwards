const express = require( 'express' );
const router = express.Router();
const mysql = require( 'mysql' );
var formidable = require( 'formidable' );
var path = require( 'path' );


const pool  = mysql.createPool( {

	host: 'localhost',
	user: 'root',	
	password: 'c0a37ward3!',
	database : 'coastwards'

} );

router.post( '/upload', function ( req, res ) {

	var form = new formidable.IncomingForm();
	form.uploadDir = path.join( __dirname, '../public/uploads' );
	form.keepExtensions = true;
	form.type = 'multipart';

	form.parse( req );

	form.on( 'error', function ( err ){

		//file.path = __dirname + '/uploads/' + file.name;

	} );

	form.on( 'fileBegin', function ( name, file ){

		//file.path = __dirname + '/uploads/' + file.name;

	} );

	form.on( 'end', function ( ){

		res.send( 'Well done!' );

	} );


	/*var contribution = req.body.dropzone[ 0 ];
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

	} );*/


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