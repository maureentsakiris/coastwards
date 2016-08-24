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

// http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
/*function dataURItoBlob ( dataURI ) {

	// convert base64/URLEncoded data component to raw binary data held in a string
	let byteString

	if ( dataURI.split( ',' )[ 0 ].indexOf( 'base64' ) >= 0 )
		byteString = atob( dataURI.split( ',' )[ 1 ] )
	else
		byteString = unescape( dataURI.split( ',' )[ 1 ] )

	// separate out the mime component
	let mimeString = dataURI.split( ',' )[ 0 ].split( ':' )[ 1 ].split( ';' )[ 0 ]

	// write the bytes of the string to a typed array
	let ia = new Uint8Array( byteString.length ) // eslint-disable-line no-undef
	for ( let i = 0; i < byteString.length; i++ ) {

		ia[ i ] = byteString.charCodeAt( i )

	}

	return new Blob( [ ia ], { type:mimeString } )

}*/

const _promiseResize = ( image ) => {

	return new Promise ( ( resolve, reject ) => {

		const reader = new FileReader()

		reader.onload = function ( e ) {

			let img = new Image()

			img.onload = () => {

				let canvas = document.getElementById( 'canvas' )
				let max = 800
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







/*let width  = canvas.width
				let styleWidth  = canvas.style.width
				let height = canvas.height
				let styleHeight = canvas.style.height

				let orientation = image.exifdata.orientation

				if ( orientation ) {

					if ( orientation > 4 ) {
					
						canvas.width = height
						canvas.style.width = styleHeight
						canvas.height = width
						canvas.style.height = styleWidth

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
					
				}*/








/*const validations = [

	{

		methodName: "imageHasMinimumDimensions",
		required: true,
		passesWhen: true,
		action: false,
		options: { minimumDimensions: [ 800, 800 ] }

	},
	{

		methodName: "imageHasLocation",
		required: true,
		passesWhen: true,
		action: true

	}
	
]

const Validators = {

	imageHasLocation: ( image ) => {

		let flag = false
		let lat, long
		let tags = image.exifdata

		const _toDecimal = ( number, ref, l ) => {

			let decimal = number[ 0 ].numerator + number[ 1 ].numerator / ( 60 * number[ 1 ].denominator ) + number[ 2 ].numerator / ( 3600 * number[ 2 ].denominator );
			let flip = l == 'lat' ? ref == 'N' ? 1 : -1 : ref == 'W' ? -1 : 1;

			return decimal * flip;

		}

		if( _.isArray( tags.GPSLatitude ) && _.isArray( tags.GPSLongitude ) ){

			lat = _toDecimal( tags.GPSLatitude, tags.GPSLatitudeRef, 'lat' );
			long = _toDecimal( tags.GPSLongitude, tags.GPSLongitudeRef, 'long' );
			flag = true

		}else{

			flag = false

		}

		let result = {

			flag: flag,
			specs: {

				lat: lat,
				long: long

			}

		}

		return result

	},
	imageHasMinimumDimensions: ( image, options ) => {

		let flag = false
		let tags = image.exifdata
		let dim = options.minimumDimensions

		if( tags.PixelXDimension >= dim[ 0 ] && tags.PixelYDimension >= dim[ 1 ] ){

			flag = true

		}

		let result = {

			flag: flag,
			specs: {

				width: tags.PixelXDimension,
				height: tags.PixelYDimension

			}

		}

		return result

	}
}*/

/*const _promiseRunTests = ( image ) => {

	return new Promise( ( resolve ) => {

		const stack = validations.slice()
		let abort = false

		const runNextTest = ( ) => {

			const runTest = ( test, runNextTest ) => {

				let { methodName, required, passesWhen, action, options } = test
				const method = Validators[ methodName ]

				let result = method( image, options )
				let passed = util.isBoolean( passesWhen ) ? passesWhen === result.flag : result.flag

				image[ methodName ] = { result, passed }

				if( !passed && required && !action ){

					abort = true

				}

				runNextTest()

			}

			if( abort ){

				image.status = 'invalid'
				resolve( image )

			}else{

				let test = stack.shift();

				if( test ){
					
					runTest( test, runNextTest )

				}else{

					let count = _.chain( validations )

					// filter required validations
					.filter( ( validation ) => { 

						return validation.required 

					} )

					// return results for required validations
					.map( ( requiredValidation ) => {

						return !!image[ requiredValidation.methodName ].passed;

					} )

					// filter for failed validations
					.filter( ( passed ) => { 

						return passed === false; 

					} )

					.value()

					let status = count == 0 ? 'valid' : 'action'
					image.status = status

					resolve( image )


				}

			}

		}

		runNextTest()

	} )

}*/
