import _ from 'underscore'

export const promiseXHR = ( options ) => {

	var defaultOptions = {

		method: 'POST',
		onProgress: () => {}

	}

	var opts = _.extend( defaultOptions, options );
	
	return new Promise( ( resolve, reject ) => {

		if( !opts.url ){

			return reject( Error( 'promiseXHR_url_empty' ) );

		}

		var xhr = new XMLHttpRequest();

		xhr.open( opts.method, opts.url, true );

		xhr.addEventListener( 'error', ( /*error*/ ) => {

			reject( Error( 'error_connecting_via_xhr' ) )

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
