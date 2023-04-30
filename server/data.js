const express = require( 'express' )
const router = express.Router()
const mysql = require( 'mysql' )
const formidable = require( 'formidable' )
const _ = require( 'underscore' )
const stringify = require( 'csv-stringify' )

const pool  = require('./mysql').pool

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

const _promiseFetchGeoJson = ( fields ) => {

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

				connection.query( query, function ( error, results ) {

					if( error ){

						reject( error )

					}else{

						if( results[ 1 ][ 0 ].geojson === undefined ){

							reject( Error( 'data/_promiseFetchGeoJson/Could not read result from query (Update schema?)' ) )

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
		.then( _promiseFetchGeoJson )
		.then( JSON.parse )
		.then( ( geojson ) => {

			res.json( { status: 'OK', json: geojson } )
			return geojson;

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )



function _promiseFetchResults ( params ){

	return new Promise( function ( resolve, reject ) {

		const { material, materialverified, verified, closeup, pointmanual, pointcorrected } = params

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				if( error ){

					reject( error )

				}else{

					var sql = 'SELECT contribution_id, contribution_uid, Y(contribution_point) AS contribution_longitude, X(contribution_point) AS contribution_latitude, contribution_verified, contribution_material, contribution_material_verified, contribution_point_manual, contribution_point_corrected, contribution_closeup, contribution_comment, contribution_exif_datetime FROM contributions WHERE contribution_material LIKE ? && contribution_material_verified LIKE ? && contribution_verified LIKE ? && contribution_closeup LIKE ? && contribution_point_manual LIKE ? && contribution_point_corrected LIKE ?';

					var inserts = [

						material,
						materialverified,
						verified,
						closeup,
						pointmanual,
						pointcorrected

					]

					var query = mysql.format( sql, inserts )

					connection.query( query, function ( error, results ) {

						if( error ){

							reject( error )

						}else{

							if( results === undefined ){

								reject( Error( 'data/_promiseFetchCSV/Could not read result from query (Update schema?)' ) )

							}else{

								resolve( results )

							}

						}
						
						connection.release()

					} )

				}

			}

		} )

	} )

}

function _promiseOutputCSV ( results ){

	return new Promise( function ( resolve, reject ) {

		stringify( results, { header: true, delimiter: ';' }, function ( error, output ){

			if( error ){

				reject( error )

			}else{

				resolve( output )

			}

		} )

	} )

}

router.get( '/csv', function ( req, res ) {

	_promiseFetchResults( req.query )
	// _promiseFetchForm( req )
	// 	.then( _promiseFetchResults )
		.then( _promiseOutputCSV )
		.then( ( output ) => {

			const date = new Date()

			res.setHeader( 'Content-Type', 'text/csv' )
			res.setHeader( 'Content-disposition', 'attachment; filename=coastwards' + '-' + date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDate() + '_' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds() + '.csv' )
			res.send( output )
			return output;

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )

/*router.post( '/csv', function ( req, res ) {

	_promiseFetchForm( req )
		.then( _promiseFetchResults )
		.then( _promiseOutputCSV )
		.then( ( output ) => {

			const date = new Date()

			res.setHeader( 'Content-Type', 'text/csv' )
			res.setHeader( 'Content-disposition', 'attachment; filename=coastwards' + '-' + date.getFullYear() + '-' + ( date.getMonth() + 1 ) + '-' + date.getDate() + '_' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds() + '.csv' )
			res.send( output )
			return output;

		} )
		.catch( ( error ) => {

			res.json( { status: 'KO', message: error.toString() } )

		} )

} )*/


module.exports = router