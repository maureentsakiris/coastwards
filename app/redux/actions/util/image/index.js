import EXIF from './exif'
import _ from 'underscore'
import accepts from 'attr-accept'

export const promiseType = ( image, type ) => {

	return new Promise( ( resolve, reject ) => {

		if( accepts( image, type ) ){

			resolve( image )

		}else{

			reject( Error( 'wrong_filetype' ) )

		}

	} )

}

export const promiseEXIF = ( image ) => {

	return new Promise( ( resolve, reject ) => {

		let exif = EXIF.getData( image, function ( ) {

			if( _.isEmpty( image.exifdata ) ){

				reject( Error( 'exifdata_empty' ) )

			}else{

				resolve( image )

			}

		} )

		if( !exif ){

			reject( Error( 'exifdata_undefined' ) )

		}

	} )

}

export const promiseMinimumBoxDimensions = ( image, boxlength ) => {


	return new Promise( ( resolve, reject ) => {

		if( !boxlength ){

			reject( Error( 'You need to define the boxlength to promiseMinimumBoxDimensions' ) )

		}

		if( !image.exifdata ){

			reject( Error( 'You need to promiseEXIF first to promiseMinimumBoxDimensions' ) )

		}

		let exif = image.exifdata

		if( !exif.PixelXDimension ){

			reject( Error( 'exifdata_pixelXDimension_undefined' ) )

		}

		if( !exif.PixelYDimension ){

			reject( Error( 'exifdata_pixelYDimension_undefined' ) )

		}

		let shortSide = exif.PixelXDimension <= exif.PixelYDimension ? exif.PixelXDimension : exif.PixelYDimension

		if( shortSide >= boxlength ){

			resolve( image )

		}else{

			reject( Error( 'image_too_small' ) )

		}

	} )

}

export const promiseCanvasBoxResize = ( image, boxlength ) => {

	return new Promise ( ( resolve, reject ) => {

		const reader = new FileReader()

		reader.onload = function ( e ) {

			let img = new Image()

			img.onload = () => {

				let canvas = document.createElement( 'canvas' )
				canvas.setAttribute( "style", "display:none" )
				document.body.appendChild( canvas )

				let max = boxlength
				let width = img.width
				let height = img.height

				if ( width > height ) {

					if ( width > max ) {

						height *= max / width
						width = max

					}
					
				} else {

					if ( height > max ) {

						width *= max / height
						height = max

					}

				}

				canvas.width = width
				canvas.height = height
		
				let ctx = canvas.getContext( "2d" )
				ctx.drawImage( img, 0, 0, width, height )
				let resizedImage = canvas.toDataURL( "image/jpeg", 1.0 )

				image.dataURL = resizedImage

				resolve( image )

			}

			img.src = e.target.result

		}

		reader.onerror = function ( error ) {

			reject( error )

		}

		reader.readAsDataURL( image )


	} )

}

export const promiseLocation = ( image ) => {

	return new Promise( ( resolve, reject ) => {

		if( !image.exifdata ){

			reject( Error( 'You need to promiseEXIF first to promiseLocation' ) )

		}

		const _toDecimal = ( number, ref, l ) => {

			let decimal = number[ 0 ].numerator + number[ 1 ].numerator / ( 60 * number[ 1 ].denominator ) + number[ 2 ].numerator / ( 3600 * number[ 2 ].denominator )
			let flip = l == 'lat' ? ref == 'N' ? 1 : -1 : ref == 'W' ? -1 : 1

			return decimal * flip;

		}

		let exif = image.exifdata

		if( _.isArray( exif.GPSLatitude ) && _.isArray( exif.GPSLongitude ) ){

			image.lat = _toDecimal( exif.GPSLatitude, exif.GPSLatitudeRef, 'lat' )
			image.long = _toDecimal( exif.GPSLongitude, exif.GPSLongitudeRef, 'long' )

			resolve( image )

		}else{

			reject( Error( 'location_undefined' ) )

		}

	} )

}

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
