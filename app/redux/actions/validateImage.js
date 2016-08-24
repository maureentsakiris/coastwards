import util from 'util'
import EXIF from './exif'
import _ from 'underscore'

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

const _promiseEXIF = ( image ) => {

	return new Promise( ( resolve, reject ) => {

		var exif = EXIF.getData( image, function ( ) {

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

const _promiseGoogleVision = ( image ) => {

	return new Promise ( ( resolve, reject ) => {

		const reader = new FileReader()

		reader.onload = function ( e ) {

			console.log( e )

			resolve( image )

		}

		reader.onerror = function ( error ) {

			reject( error )

		}

		reader.readAsDataURL( image )

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
		.then( _promiseGoogleVision )
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
