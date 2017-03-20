import EXIF from './exif'
import _ from 'underscore'
import accepts from 'attr-accept'
import Modernirz from 'modernizr'


export const promiseType = ( file, type='image/*' ) => {

	return new Promise( ( resolve, reject ) => {

		if( accepts( file, type ) ){

			resolve( file )

		}else{

			reject( Error( 'wrong_filetype' ) )

		}

	} )

}

export const promiseEXIF = ( image ) => {

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

export const promiseMinimumWidth = ( image, width ) => {

	return new Promise( ( resolve, reject ) => {

		if( !width ){

			reject( Error( 'You need to define the minimum width to promiseMinimumWidth' ) )

		}

		if( Modernirz.filereader ){

			let reader = new FileReader()

			reader.onload = function ( e ){

				let img = new Image()

				img.onload = function ( ){

					if( img.width < width ){

						reject( Error( 'image_too_small' ) )

					}else{

						resolve( image )

					}

				}

				img.src = e.target.result

			}

			reader.onerror = function ( error ) {

				reject( error )

			}

			reader.readAsDataURL( image )

		}else{

			reject( Error( 'dimensions_undefined' ) )

		}

	} )

}

export const promiseMinimumBoxDimensions = ( image, boxlength ) => {

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

		if( Modernirz.filereader ){

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

			reject( Error( 'dimensions_undefined' ) )

		}

	} )

}

export const promiseCanvasBoxResize = ( image, boxlength ) => {

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

				let canvas 
				canvas = document.getElementById( 'promiseCanvasBoxResize' )

				if( !canvas ){

					canvas = document.createElement( 'canvas' )

				}
				
				canvas.setAttribute( "id", "promiseCanvasBoxResize" )
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
				if ( orientation > 8 ) {

					reject( Error( "orientation_undefined" ) )

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

export const promiseDateTime = ( image ) => {

	return new Promise( ( resolve, reject ) => {

		if( !image.exifdata ){ //empty exif is dealt with in promiseEXIF

			reject( Error( 'You need to promiseEXIF before you can promiseLocation' ) )

		}

		let exif = image.exifdata

		if( !exif.DateTimeOriginal || !exif.DateTimeDigitized || !exif.DateTime ){

			reject( Error( 'no_datetime' ) )

		}else{

			resolve( image )

		}

	} )

}
