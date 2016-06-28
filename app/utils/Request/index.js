import http from 'http';
import _ from 'underscore';

module.exports.promiseXHR = ( options ) => {

	var defaultOptions = {

		method: 'POST',
		onProgress: () => {}

	}

	var opts = _.extend( options, defaultOptions );
	
	return new Promise( ( resolve, reject ) => {

		if( !opts.path ){

			return reject( Error( 'request/promiseXHR/Please specify a path to post/get' ) );

		}

		var xhr = new XMLHttpRequest();

		xhr.open( opts.method, opts.path, true );

		xhr.addEventListener( 'error', ( e ) => {

			reject( Error( 'request/promiseXHR/xhr.on(error)/' + e.statusText ) );

		}, false );

		xhr.addEventListener( 'load', ( e ) => {

			resolve( e.currentTarget.response );

		}, false );

		xhr.upload.addEventListener( 'progress', ( e ) => {

			opts.onProgress( e );

		}, false );

		xhr.send( opts.toSend );

	} );

}


module.exports.promiseHTTPget = ( options ) => {

	return new Promise( ( resolve, reject ) => {

		if( !options.path ){

			return reject( Error( 'request/promiseHTTPget/Please specify a path to get' ) );

		}

		http.get( options, ( res ) => {

			const body = [ ];

			res.on( 'data', ( chunk ) => { 

				body.push( chunk );

			} );

			res.on( 'end', ( ) => {

				resolve( body.join( '' ) );

			} );

		} ).on( 'error', ( e ) => {

			reject( e );

		} );

	} );

}