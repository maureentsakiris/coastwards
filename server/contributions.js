const express = require( 'express' );
const router = express.Router();
const mysql = require( 'mysql' );
const bodyParser = require( 'body-parser' );
const fs = require( 'fs' );


const pool  = mysql.createPool( {

	host: 'localhost',
	user: 'root',	
	password: 'c0a37ward3!',
	database : 'coastwards_schema'

} );

const jsonParser = bodyParser.json();

router.post( '/upload', jsonParser, function ( req, res ) {

	var contribution = req.body.dropzone[ 0 ];
	var ip = req.headers[ 'x-forwarded-for' ] || req.connection.remoteAddress;
	var coords = contribution.imageHasLocation.result.specs;

	console.log( req.body.dropzone );

	//INSERT INTO `coastwards_schema`.`contributions` (`contribution_filename`, `contribution_ip`, `contribution_long`, `contribution_lat`, `contribution_location_manual`) VALUES ('03.jpg', 'office', 'asdf', 'sadf', '0');
	var sql = 'INSERT INTO ??.?? ( ??, ??, ??, ??, ??) VALUES ( ?, ?, ?, ?, ?)';
	var inserts = [ 
		'coastwards_schema', 
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

			console.log( err );
			console.log( rows );
			res.json( rows );

			connection.release();

		} );

	} );


} );


router.get( '/geojson', function ( req, res ) {

	pool.getConnection( function ( err, connection ) {

		connection.query( 'SELECT * FROM contributions_schema', function ( err, rows ) {

			res.json( rows );
			connection.release();

		} );

	} );

} );

module.exports = router;