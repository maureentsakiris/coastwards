const express = require( 'express' )
const router = express.Router()
const formidable = require( 'formidable' )
const _ = require( 'underscore' )
const nodemailer = require( 'nodemailer' )
require( 'dotenv' ).config()

//var transporter = nodemailer.createTransport( 'smtps://go%40coastwards.org:EK.cc74q{q@6ykn-r2f5.accessdomain.com' )

var poolConfig = {

	pool: true,
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: false,
	auth: {

		user: process.env.SMTP_AUTH_USER,
		pass: process.env.SMTP_AUTH_PASSWORD

	}

}


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

		/*form.on( 'end', function ( ){

			resolve( form )

		} )
*/
	
	} )

}




const _sendAsk = ( fields ) => {

	return new Promise( ( resolve, reject ) => { 

		let mailOptions = {

			from: '"' + fields.email + '" <' + fields.email + '>',
			to: process.env.CONTACT_TO,
			subject: 'Still have a question...',
			text: fields.comment

		}

		let transporter = nodemailer.createTransport( poolConfig )

		transporter.sendMail( mailOptions, function ( error, info ){
 
			if( error ){

				reject( error )

			}else{

				resolve( info.response )

			}

		} )

	} )

}

router.post( '/ask', function ( req, res ) {

	_promiseFetchForm( req )
		.then( _sendAsk )
		.then( ( response ) => {

			res.send( 'OK' )
			return response

		} )
		.catch( ( error ) => {

			res.send( error.message )

		} )

} )




/*const _requestBatchUpload = ( fields ) => {

	return new Promise( ( resolve, reject ) => { 

		let mailOptions = {

			from: '"' + fields.email + '" <' + fields.email + '>',
			to: 'go@coastwards.org',
			subject: 'Request Batch Upload',
			text: fields.comment

		}

		transporter.sendMail( mailOptions, function ( error, info ){
 
			if( error ){

				reject( Error( error ) )

			}

			resolve( info.response )

		} );

	} )

}

router.post( '/requestBatchUpload', function ( req, res ) {

	_promiseFetchForm( req )
		.then( _requestBatchUpload )
		.then( ( response ) => {

			res.send( 'OK' )
			return response

		} )
		.catch( ( error ) => {

			res.send( error.message )

		} )

} )*/



const _sendReport = ( fields ) => {

	return new Promise( ( resolve, reject ) => { 

		let mailOptions = {

			from: '"' + fields.email + '" <' + fields.email + '>',
			to: process.env.REPORT_TO,
			subject: 'Reporting image with id: ' + fields.id,
			text: fields.comment

		}

		let transporter = nodemailer.createTransport( poolConfig )

		transporter.sendMail( mailOptions, function ( error, info ){
		
			if( error ){

				reject( Error( error ) )

			}else{

				resolve( info.response )

			}

		} )

	} )

}

router.post( '/report', function ( req, res ) {

	_promiseFetchForm( req )
		.then( _sendReport )
		.then( ( response ) => {

			res.send( 'OK' )
			return response

		} )
		.catch( ( error ) => {

			res.send( error.message )

		} )

} )


const _sendError = ( fields ) => {

	return new Promise( ( resolve, reject ) => { 

		let mailOptions = {

			from: process.env.SMTP_AUTH_USER,
			to: process.env.ERROR_TO,
			subject: fields.message,
			text: fields.stack

		}

		let transporter = nodemailer.createTransport( poolConfig )

		transporter.sendMail( mailOptions, function ( error, info ){
		
			if( error ){

				reject( Error( error ) )

			}else{

				resolve( info.response )

			}

		} )

	} )

}

router.post( '/error', function ( req, res ) {

	_promiseFetchForm( req )
		.then( _sendError )
		.then( ( response ) => {

			res.send( 'OK' )
			return response

		} )
		.catch( ( error ) => {

			res.send( error.message )

		} )

} )

module.exports = router
