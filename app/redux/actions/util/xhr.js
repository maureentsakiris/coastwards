import _ from 'underscore';
import http from 'http'

export const promiseXHR = ( options ) => {

	var defaultOptions = {

		method: 'POST',
		onProgress: () => {}

	}

	var opts = _.extend( options, defaultOptions );
	
	return new Promise( ( resolve, reject ) => {

		if( !opts.url ){

			return reject( Error( 'promiseXHR_path_empty' ) );

		}

		var xhr = new XMLHttpRequest();

		xhr.open( opts.method, opts.url, true );

		xhr.addEventListener( 'error', ( error ) => {

			reject( error )

		}, false );

		xhr.addEventListener( 'load', ( e ) => {

			resolve( e.currentTarget.response );

		}, false );

		xhr.upload.addEventListener( 'progress', ( e ) => {

			opts.onProgress( e );

		}, false );

		xhr.send( opts.data );

	} );

}
