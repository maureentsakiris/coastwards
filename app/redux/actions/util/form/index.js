//https://github.com/bubkoo/dataurl-to-blob/blob/master/index.js
export const promiseDataURLtoBlob = ( dataURL ) => {

	return new Promise( ( resolve, reject ) => { 

		let dataURLPattern = /^data:((.*?)(;charset=.*?)?)(;base64)?,/;
		let matches = dataURL.match( dataURLPattern )

		if ( !matches ) {

			reject( Error( 'dataurl_invalid' ) )

		}

		let mediaType = matches[ 2 ] ? matches[ 1 ] : 'text/plain' + ( matches[ 3 ] || ';charset=utf-8' )
		let isBase64   = !!matches[ 4 ];
		let dataString = dataURL.slice( matches[ 0 ].length )
		let byteString = isBase64 ? atob( dataString ) : decodeURIComponent( dataString )

		let array = []
		for ( let i = 0; i < byteString.length; i++ ) {

			array.push( byteString.charCodeAt( i ) )

		}

		let blob = new Blob( [ new Uint8Array( array ) ], { type: mediaType } ) //eslint-disable-line no-undef

		resolve( blob )

	} )

}