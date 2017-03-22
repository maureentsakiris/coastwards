import http from 'http'

export const promiseGet = ( url ) => {
	
	return new Promise( ( resolve, reject ) => {

		if( !url ){

			return reject( Error( 'request/promiseHTTPget/Please specify a path to get' ) );

		}

		http.get( url, ( res ) => {

			const body = [ ]

			res.on( 'data', ( chunk ) => { 

				body.push( chunk )

			} )

			res.on( 'end', ( ) => {

				resolve( body.join( '' ) )

			} )

		} ).on( 'error', ( e ) => {

			reject( e )

		} )

	} )

}


export const promiseJSONOK = ( parsed ) => {

	return new Promise( ( resolve, reject ) => {

		if( parsed.status == 'KO' ){

			reject( Error( parsed.message ) )

		}else{

			resolve( parsed )

		}

	} )

}