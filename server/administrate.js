const express = require( 'express' )
const router = express.Router()
const mysql = require( 'mysql' )
const formidable = require( 'formidable' )
const _ = require( 'underscore' )
const fs = require( 'fs' )
const path = require( 'path' )

const PROJECT_ROOT = path.resolve( './' )
const UPLOADS = path.join( PROJECT_ROOT, 'public/uploads/' )

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

		const { material, materialverified, verified, id, example, intro } = fields

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var sql = 'SELECT * FROM contributions WHERE contribution_material LIKE ? && contribution_material_verified LIKE ? && contribution_verified LIKE ? && contribution_id LIKE ? && contribution_example LIKE ? && contribution_intro LIKE ?';

				var inserts = [

					material,
					materialverified,
					verified,
					id,
					example,
					intro

				]

				var query = mysql.format( sql, inserts )

				//console.log( query );

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

		const { id, uid } = fields

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

						resolve( uid )

					}
					
					connection.release()

				} )

			}

		} )

	} )

}

const _unlink = ( uid ) => {

	return new Promise( ( resolve, reject ) => { 

		fs.unlink( path.join( UPLOADS, uid + '.jpg' ), ( error ) => {

			if( error ){

				reject( error )

			}else{

				resolve( uid )

			}

		} )

	} ) 

}

router.post( '/delete', function ( req, res ) {

	_promiseFetchForm( req )
	.then( _delete )
	.then( _unlink )
	.then( ( uid ) => {

		res.json( { status: 'OK', uid: uid } )
		
		return uid

	} )
	.catch( ( error ) => {

		res.json( { status: 'KO', message: error.toString() } )

	} )

} )

const _update = ( fields ) => {

	return new Promise( ( resolve, reject ) => { 

		const { contribution_id, contribution_verified, contribution_material_verified, contribution_example, contribution_intro } = fields

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var sql = 'UPDATE ?? SET contribution_verified=?, contribution_material_verified=?, contribution_example=?, contribution_intro=? WHERE contribution_id=?';

				var inserts = [

					"contributions",

					contribution_verified,
					contribution_material_verified,
					contribution_example,
					contribution_intro,

					contribution_id

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

router.post( '/update', function ( req, res ) {

	_promiseFetchForm( req )
	.then( _update )
	.then( ( affectedRows ) => {

		res.json( { status: 'OK', affectedRows: affectedRows } )
		
		return affectedRows

	} )
	.catch( ( error ) => {

		res.json( { status: 'KO', message: error.toString() } )

	} )

} )


function promiseFetchExamples (){

	return new Promise( function ( resolve, reject ) {

		pool.getConnection( function ( error, connection ) {

			if( error ){

				reject( error )

			}else{

				var sql = 'SELECT GROUP_CONCAT(contribution_uid) as uids, ?? as type FROM ?? WHERE ??=? GROUP BY ??'
				//var sql = 'SELECT CONCAT( \' { "type": \', contribution_material_verified, \', “images”: [\', GROUP_CONCAT(contribution_uid), \'] } \' ) as json FROM ?? WHERE ??=? GROUP BY ??'
				var inserts = [

					"contribution_material_verified",

					"contributions",

					"contribution_example",
					"1",

					"contribution_material_verified"

				]

				var query = mysql.format( sql, inserts )

				connection.query( query, function ( err, results ) {

					if( error ){

						reject( error )

					}else{

						if( results === undefined ){

							reject( Error( 'contributions/promiseFetchExamples/Could not read result from query (Update schema?)' ) )

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

router.get( '/examples', function ( req, res ) {

	promiseFetchExamples()
	.then( ( json ) => {

		res.json( { status: 'OK', json: json } )
		return json;

	} )
	.catch( ( error ) => {

		res.json( { status: 'KO', message: error.toString() } )

	} )

} )


module.exports = router