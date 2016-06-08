const express = require( 'express' );
const router = express.Router();
const mysql = require( 'mysql' );
//var bodyParser = require( 'body-parser' );
var formidable = require( 'formidable' );


const pool  = mysql.createPool( {

	host: 'localhost',
	user: 'root',	
	password: 'c0a37ward3!',
	database : 'coastwards'

} );

//var jsonParser = bodyParser.json();

router.post( '/upload', function ( req, res ) {

	var form = new formidable.IncomingForm();

	form.parse( req, function ( err, fields, files ) {
		
		console.log( fields );

	} );

	console.log

	form.on( 'fileBegin', function ( name, file ){

		console.log( 'name: ', name );
		console.log( file );
		//file.path = __dirname + '/uploads/' + file.name;

	} );

	form.on( 'file', function ( name, file ){

		console.log( 'Uploaded ' + file.name );

	} );

	res.send( req.body );

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