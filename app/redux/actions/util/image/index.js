import EXIF from './exif'
import _ from 'underscore'
import accepts from 'attr-accept'
import Modernirz from 'modernizr'


export const promiseType = ( image, type ) => {

	//console.log( "promiseType" )

	return new Promise( ( resolve, reject ) => {

		if( accepts( image, type ) ){

			resolve( image )

		}else{

			reject( Error( 'wrong_filetype' ) ) //YES

		}

	} )

}

export const promiseEXIF = ( image ) => {

	//console.log( "promiseEXIF" )

	return new Promise( ( resolve, reject ) => {

		EXIF.getData( image, function ( ) {

			if( _.isEmpty( image.exifdata ) ){

				reject( Error( 'exifdata_empty' ) )

			}else{

				resolve( image )

			}

		} )

	} )

}

export const promiseMinimumBoxDimensions = ( image, boxlength ) => {

	//console.log( "promiseMinimumBoxDimensions" )

	return new Promise( ( resolve, reject ) => {

		if( !boxlength ){

			reject( Error( 'You need to define the boxlength to promiseMinimumBoxDimensions' ) )

		}

		const _dotheMath = ( width, height ) => {

			let shortSide = width <= height ? width : height

			if( shortSide >= boxlength ){

				resolve( image )

			}else{

				reject( Error( 'image_too_small' ) ) //YES

			}

		}

		if( image.exifdata && image.exifdata.PixelXDimension && image.exifdata.PixelYDimension ){

			_dotheMath( image.exifdata.PixelXDimension, image.exifdata.PixelYDimension )

		}else if( !image.exifdata && Modernirz.filereader ){

			let reader = new FileReader()

			reader.onload = function ( e ){

				let img = new Image()

				img.onload = function ( ){

					image.width = img.width
					image.height = img.height

					_dotheMath( img.width, img.height )

				}

				img.src = e.target.result

			}

			reader.onerror = function ( error ) {

				reject( error )

			}

			reader.readAsDataURL( image )

		}else{

			reject( Error( 'unsupported' ) ) //YES

		}

	} )

}

export const promiseCanvasBoxResize = ( image, boxlength ) => {

	//console.log( "promiseCanvasBoxResize" )

	return new Promise ( ( resolve, reject ) => {

		if( !Modernirz.filereader || !Modernirz.canvas ){

			reject( Error( 'unsupported' ) )

		}

		if( !image.exifdata ){ //empty exif is dealt with in promiseEXIF

			reject( Error( 'You need to promiseEXIF before you can promiseCanvasBoxResize' ) )

		}

		const reader = new FileReader()

		reader.onload = function ( e ) {

			let img = new Image()

			img.onload = () => {

				let canvas = document.createElement( 'canvas' )
				canvas.setAttribute( "style", "display:none" )
				document.body.appendChild( canvas )

				let width = img.width
				let height = img.height

				if ( width > height ) {

					if ( width > boxlength ) {

						height *= boxlength / width
						width = boxlength

					}
					
				} else {

					if ( height > boxlength ) {

						width *= boxlength / height
						height = boxlength

					}

				}

				let ctx = canvas.getContext( "2d" )
				canvas.width = width
				canvas.height = height
				ctx.save()

				let orientation = image.exifdata.Orientation
				if ( !orientation || orientation > 8 ) {

					reject( Error( "orientation_undefined" ) ) //YES

				}

				if ( orientation > 4 ) {

					canvas.width = height
					canvas.height = width
				
				}

				switch ( orientation ) {

				case 2: 
					ctx.translate( width, 0 )
					ctx.scale( -1, 1 )
					break
				case 3: 
					ctx.translate( width, height )
					ctx.rotate( Math.PI )
					break
				case 4: 
					ctx.translate( 0, height )
					ctx.scale( 1, -1 )
					break
				case 5: 
					ctx.rotate( 0.5 * Math.PI )
					ctx.scale( 1, -1 )
					break
				case 6: 
					ctx.rotate( 0.5 * Math.PI )
					ctx.translate( 0, -height )
					break
				case 7: 
					ctx.rotate( 0.5 * Math.PI )
					ctx.translate( width, -height )
					ctx.scale( -1, 1 )
					break
				case 8: 
					ctx.rotate( -0.5 * Math.PI )
					ctx.translate ( -width, 0 )
					break
				}

				ctx.drawImage( img, 0, 0, width, height )
				ctx.restore()

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

	//console.log( "promiseLocation" )

	return new Promise( ( resolve, reject ) => {

		if( !image.exifdata ){ //empty exif is dealt with in promiseEXIF

			reject( Error( 'You need to promiseEXIF before you can promiseLocation' ) )

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

			reject( Error( 'location_undefined' ) ) //YES

		}

	} )

}
