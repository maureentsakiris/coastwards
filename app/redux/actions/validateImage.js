import EXIF from './exif'
import _ from 'underscore'
import xhr from './xhr'

const _promiseEXIF = ( image ) => {

	return new Promise( ( resolve, reject ) => {

		let exif = EXIF.getData( image, function ( ) {

			if( _.isEmpty( image.exifdata ) ){

				reject( Error( 'exifdata_empty' ) )

			}else{

				resolve( image )

			}

		} );

		if( !exif ){

			reject( Error( 'exifdata_undefined' ) )

		}

	} );

}

const _promiseMinimumDimension = ( image ) => {

	return new Promise( ( resolve, reject ) => {

		let exif = image.exifdata

		if( exif.PixelXDimension && exif.PixelXDimension >= 800 ){

			resolve( image )

		}else{

			reject( Error( 'image_too_small' ) )

		}

	} )

}

const _promiseResize = ( image ) => {

	return new Promise ( ( resolve, reject ) => {

		const reader = new FileReader()

		reader.onload = function ( e ) {

			let img = new Image()

			img.onload = () => {

				let canvas = document.getElementById( 'canvas' )

				let max = 500
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

const _promiseGoogle = ( image ) => {

	return new Promise( ( resolve, reject ) => {
	
		setTimeout( ( ) => { 

			resolve( image ) 

		}, 5000 )

	} )

}

const _promiseLocation = ( image ) => {

	return new Promise( ( resolve/*, reject*/ ) => {

		const _toDecimal = ( number, ref, l ) => {

			let decimal = number[ 0 ].numerator + number[ 1 ].numerator / ( 60 * number[ 1 ].denominator ) + number[ 2 ].numerator / ( 3600 * number[ 2 ].denominator );
			let flip = l == 'lat' ? ref == 'N' ? 1 : -1 : ref == 'W' ? -1 : 1;

			return decimal * flip;

		}

		let exif = image.exifdata

		if( _.isArray( exif.GPSLatitude ) && _.isArray( exif.GPSLongitude ) ){

			image.lat = _toDecimal( exif.GPSLatitude, exif.GPSLatitudeRef, 'lat' );
			image.long = _toDecimal( exif.GPSLongitude, exif.GPSLongitudeRef, 'long' );
	
			image.status = 'valid'
			resolve( image )

		}else{

			image.status = 'action'
			resolve( image )
			//reject( Error( 'location_undefined' ) )

		}

	} )

}



export function validateImage ( image ) {

	return new Promise( ( resolve, reject ) => {

		_promiseEXIF( image )
		.then( _promiseMinimumDimension )
		.then( _promiseResize )
		.then( _promiseGoogle )
		.then( _promiseLocation )
		.then( ( image ) => {

			resolve( image )
			return ( image )

		} )
		.catch( ( error ) => {

			image.status = 'invalid'
			image.error = error
			resolve( image )

		} )

	} )

}
