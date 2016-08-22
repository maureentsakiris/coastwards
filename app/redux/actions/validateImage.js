import util from 'util'
import EXIF from './exif'
import _ from 'underscore'

const validations = [

	{
		methodName: "imageHasLocation",
		options: { required: true, passesWhen: true, abort: false }
	},
	{
		methodName: "imageMinimumDimensions",
		options: { minimumDimensions: [ 800, 800 ], required: true, passesWhen: true, abort: false }
	}
	
]

const Validators = {

	imageHasLocation: ( image ) => {

		return true

	},
	imageMinimumDimensions: ( image ) => {

		return true

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

				let { methodName, options } = test
				const method = Validators[ methodName ]

				let result = method( image, options )
				let passed = util.isBoolean( options.passesWhen ) ? options.passesWhen === result : result

				image[ methodName ] = { result, passed }

				runNextTest()

			}

			let test = stack.shift();

			if( test ){
				
				runTest( test, runNextTest )

			}else{

				console.log( image )

				let failed = _.chain( validations )

				// filter required validations
				.filter( ( validation ) => { 

					return validation.options.required 

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

				let isValid = failed.length == 0;

				image.status = isValid ? 'valid' : 'invalid'

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


/*	_runTests ( ){

		const { validations, onValidationDone } = this.props;
		const { status } = this.state;

		const validatorStack = validations.slice();

		const abortTests = ( ) => {

			onValidationDone( false, status, this );

		}

		const runNextTest = ( ) => {

			let test = validatorStack.shift();

			if( test ){

				this._runTest ( test, runNextTest, abortTests );

			}else{

				let countFailed = _.chain( validations )

				// filter required validations
				.filter( ( validation ) => { 

					return validation.options.required 

				} )

				// return results for required validations
				.map( ( requiredValidation ) => {

					return !!status[ requiredValidation.methodName ].passed;

				} )

				// filter for failed validations
				.filter( ( passed ) => { 

					return passed === false; 

				} )

				.value();

				let isValidDrop = countFailed.length == 0;

				onValidationDone( isValidDrop, status, this );

			}


		}

		runNextTest();

	}

	_runTest ( test, runNextTest, abortTests ){

		let { onTestDone } = this.props;
		let { methodName, label, description, success, error, options } = test;

		const method = ImageValidators[ methodName ];

		const callMethod = ( ) => {

			let result = method( this, options );

			let passed = util.isBoolean( options.passesWhen ) ? options.passesWhen === result.flag : result.flag;
			let message = passed ? success : error;

			onTestDone( this, message, passed, result, test );

			let callback = !passed && options.abort ? abortTests : runNextTest;

			status[ methodName ] = { result, passed, message, label, description };
			validations[ methodName ] = { result, passed };

			this.setState( ( state ) => {

				return { 

					status: _.extend( state.status, status ), 
					validations: _.extend( state.validations, validations )

				}

			}, callback );

		}

		let status = this.state.status;
		let validations = this.state.validations;
		status[ methodName ] = { label, description };

		this.setState( ( state ) => {

			return {

				status: _.extend( state.status, status )

			}

		}, callMethod );

	}

}


const ImageValidators = {

	imageHasLocation: function ( comp ) {

		let flag = false;
		let lat, long;
		let tags = comp.state.tags;

		const _toDecimal = ( number, ref, l ) => {

			let decimal = number[ 0 ].numerator + number[ 1 ].numerator / ( 60 * number[ 1 ].denominator ) + number[ 2 ].numerator / ( 3600 * number[ 2 ].denominator );
			let flip = l == 'lat' ? ref == 'N' ? 1 : -1 : ref == 'W' ? -1 : 1;

			return decimal * flip;

		}

		if( _.isArray( tags.GPSLatitude ) && _.isArray( tags.GPSLongitude ) ){

			lat = _toDecimal( tags.GPSLatitude, tags.GPSLatitudeRef, 'lat' );
			long = _toDecimal( tags.GPSLongitude, tags.GPSLongitudeRef, 'long' );
			flag = true;

		}else{

			flag = false;

		}

		let result = {

			flag: flag,
			specs: {

				lat: lat,
				long: long

			}

		}

		return result;

	},
	imageMinimumDimensions: function ( comp, options ) {

		let flag = false;
		let tags = comp.state.tags;
		let dim = options.minimumDimensions;

		if( tags.PixelXDimension >= dim[ 0 ] && tags.PixelXDimension >= dim[ 1 ] ){

			flag = true;

		}

		let result = {

			flag: flag,
			specs: {

				width: tags.PixelXDimension,
				height: tags.PixelYDimension

			}

		}

		return result;

	},
	imageWithFlash: function (  ) {

		let flag = false;

		let result = {

			flag: flag,
			specs: {}

		}

		return result;

	},
	imageHasColor: function (  ) {

		let flag = true;

		let result = {

			flag: flag,
			specs: {}

		}

		return result;

	}


}*/