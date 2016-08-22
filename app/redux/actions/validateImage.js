import util from 'util'
import EXIF from './exif'
import _ from 'underscore'

const validations = [

	{

		methodName: "imageHasLocation",
		required: true,
		passesWhen: true,
		action: true

	},
	{

		methodName: "imageHasMinimumDimensions",
		required: true,
		passesWhen: true,
		action: false,
		options: { minimumDimensions: [ 800, 800 ] }

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
}

const _promiseEXIF = ( image ) => {

	return new Promise( ( resolve, reject ) => {

		var exif = EXIF.getData( image, function ( ) {

			resolve( image )

		} );

		if( !exif ){

			reject( Error( 'actions/form.js/_promiseFilesValidated/Extracting EXIF data failed' ) )

		}

	} );

}

const _promiseRunTests = ( image ) => {

	return new Promise( ( resolve/*, reject*/ ) => {

		const stack = validations.slice()

		const runNextTest = ( ) => {

			const runTest = ( test, runNextTest ) => {

				let { methodName, passesWhen, options } = test
				const method = Validators[ methodName ]

				let result = method( image, options )
				let passed = util.isBoolean( passesWhen ) ? passesWhen === result.flag : result.flag

				image[ methodName ] = { result, passed }

				runNextTest()

			}

			const countFailed = ( action ) => {

				let count = _.chain( validations )

				// exclude location test
				.filter( ( validation ) => {

					return validation.action === action

				} )

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

				return count == 0 ? true : false

			}

			let test = stack.shift();

			if( test ){
				
				runTest( test, runNextTest )

			}else{

				const passedNoAction = countFailed( false )
				const passedAction = countFailed( true )

				let status = passedNoAction && passedAction ? 'valid' : passedNoAction && !passedAction ? 'action' : 'invalid'

				image.status = status

				resolve( image )


			}

		}

		runNextTest()

	} )

}


export function validateImage ( image ) {

	return new Promise( ( resolve, reject ) => {

		_promiseEXIF( image )
		.then( _promiseRunTests )
		.then( ( image ) => {

			resolve( image )
			return ( image )

		} )
		.catch( ( error ) => {

			reject( error )

		} )

	} )

}
