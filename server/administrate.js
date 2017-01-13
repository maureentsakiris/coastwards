const express = require( 'express' )
const router = express.Router()
const mysql = require( 'mysql' )
const formidable = require( 'formidable' )
const _ = require( 'underscore' )

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

		const { material } = fields

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var sql = 'SELECT * FROM contributions WHERE contribution_material=?';

				var inserts = [

					material

				]

				var query = mysql.format( sql, inserts )

				connection.query( query, function ( err, results ) {

					if( error ){

						reject( error )

					}else{

						resolve( results )

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
	.then( ( results ) => {

		res.json( { status: 'OK', results: results } )
		return results

	} )
	.catch( ( error ) => {

		res.json( { status: 'KO', message: error.toString() } )

	} )

} )


const _delete = ( fields ) => {

	return new Promise( ( resolve, reject ) => { 

		const { id } = fields

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var sql = 'DELETE FROM contributions WHERE contribution_id=?';

				var inserts = [

					id

				]

				var query = mysql.format( sql, inserts )

				connection.query( query, function ( err, result ) {

					if( error ){

						reject( error )

					}else{

						resolve( result.affectedRows )

					}
					
					connection.release()

				} )

			}

		} )

	} )

}

router.post( '/delete', function ( req, res ) {

	_promiseFetchForm( req )
	.then( _delete )
	.then( ( affectedRows ) => {

		res.json( { status: 'OK', affectedRows: affectedRows } )
		
		return affectedRows

	} )
	.catch( ( error ) => {

		res.json( { status: 'KO', message: error.toString() } )

	} )

} )


module.exports = router