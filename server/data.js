const express = require( 'express' )
const router = express.Router()
const mysql = require( 'mysql' )
const formidable = require( 'formidable' )
const _ = require( 'underscore' )
const stringify = require( 'csv-stringify' )

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

const _promiseFetchForm = ( req ) => {

	var form = new formidable.IncomingForm()

	return new Promise( ( resolve, reject ) => {

		form.parse( req, function ( error, fields ) {

			if( error ){

				reject( Error( 'contact/_promiseFetchForm/parse(error)/' + error ) )

			}else if ( _.isEmpty( fields ) ){

				reject( Error( 'Form is empty' ) )

			}else{

				resolve( fields )

			}

		} )

		form.on( 'error', function ( error ){

			reject( Error( 'contact/_promiseFetchForm/on(error)/' + error ) )

		} )

		form.on( 'aborted', function ( error ){

			reject( Error( 'contact/_promiseFetchForm/on(aborted)/' + error ) )

		} )
	
	} )

}

const _fetch = ( fields ) => {

	return new Promise( ( resolve, reject ) => { 

		const { material, materialverified, verified, closeup, pointmanual, pointcorrected } = fields

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var sql = 'SET group_concat_max_len = 100000000; SELECT CONCAT( \'{ "type": "FeatureCollection", "features": [\', GROUP_CONCAT(\' { "type": "Feature", "geometry": \', ST_AsGeoJSON(contribution_point), \', "properties": { "id": "\',contribution_id,\'", "materialverified": "\',IFNULL(contribution_material_verified, "notset" ),\'" } } \'), \'] }\' ) as geojson FROM contributions WHERE contribution_material LIKE ? && contribution_material_verified LIKE ? && contribution_verified LIKE ? && contribution_closeup LIKE ? && contribution_point_manual LIKE ? && contribution_point_corrected LIKE ?';

				var inserts = [

					material,
					materialverified,
					verified,
					closeup,
					pointmanual,
					pointcorrected

				]

				var query = mysql.format( sql, inserts )

				connection.query( query, function ( err, results ) {

					if( error ){

						reject( error )

					}else{

						if( results[ 1 ][ 0 ].geojson === undefined ){

							reject( Error( 'administrate/_fetch/Could not read result from query (Update schema?)' ) )

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

router.post( '/fetch', function ( req, res ) {

	_promiseFetchForm( req )
		.then( _fetch )
		.then( JSON.parse )
		.then( ( geojson ) => {

			res.json( { status: 'OK', json: geojson } )
			return geojson;

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )

function promiseFetchCSV (){

	return new Promise( function ( resolve, reject ) {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var sql = 'SELECT ST_AsText(??) as Point, ?? as Material FROM ??'
				var inserts = [

					"contribution_point",
					"contribution_material_verified",


					"contributions"

				]

				var query = mysql.format( sql, inserts )

				connection.query( query, function ( err, results ) {

					if( error ){

						reject( error )

					}else{

						if( results === undefined ){

							reject( Error( 'data/promiseFetchCSV/Could not read result from query (Update schema?)' ) )

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

router.get( '/csv', function ( req, res ) {

	promiseFetchCSV()
		.then( ( results ) => {

			//res.send( new Buffer( results ) )
			/*let columns = {

				point: "Point",
				material: "Material"

			}*/

			stringify( results, { header: true }, function ( err, output ){

				const date = new Date()

				res.set( 'Content-Type', 'text/csv' )
				res.set( { "Content-Disposition": "attachment; filename=coastwards" + "-" + date.getFullYear() + "-" + ( date.getMonth() + 1 ) + "-" + date.getDate() + "_" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + ".csv" } )
				res.send( output )

			} )

			return results;

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )

module.exports = router