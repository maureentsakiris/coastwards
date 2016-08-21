import * as types from 'types'
import { addSnackbarMessage } from 'actions/snackbar'
import _ from 'underscore'
import accepts from 'attr-accept'
import EXIF from './exif'


function _promiseFilesSelected ( e ){

	return new Promise( ( resolve, reject ) => {

		const filesSelected = e.dataTransfer ? e.dataTransfer.files : e.currentTarget.files;

		if( filesSelected.length > 0 ){

			resolve( filesSelected );

		}else{

			reject( Error( 'form.js/_promiseFilesSelected/filesSelected.length = 0' ) );

		}

	} );

}

function _promiseFilesAccepted ( filesSelected ){ //for images that have been dropped not selected

	return new Promise( ( resolve, reject ) => {

		let filesAccepted = []
		let filesRejected = []

		_.each( filesSelected, ( file ) => {

			if( accepts( file, 'image/*' ) ){ // --> upload.jsx

				filesAccepted.push( file )

			}else{

				file.status = 'rejected'
				filesRejected.push( file )

			}

		} )


		if( !filesAccepted.length ){

			reject( Error( 'warning_all_files_rejected' ) ) // --> error.js

		}else{

			resolve( { filesAccepted, filesRejected } )

		}

	} )

}

function _promiseFilesValidated ( filesAccepted ){

	const _promiseEXIF = ( image ) => {

		return new Promise( ( resolve, reject ) => {

			var exif = EXIF.getData( image, function ( ) {

				let tags = EXIF.getAllTags( this );

				if( !tags ){

					reject( Error( 'DropzoneTBFile/_promiseEXIF/Could not load tags from EXIF' ) );

				}

				resolve( image )

			} );

			if( !exif ){

				reject( Error( 'DropzoneTBFile/_promiseEXIF/Could not load EXIF' ) );

			}

		} );

	}


	const validateImage = ( image ) => {

		return _promiseEXIF( image )
		.then( ( image ) => {

			image.status = 'valid'
			return image

		} )
		.catch( ( error ) => {

			console.log( error )

		} )

	}

	return Promise.all( _.map( filesAccepted, ( image ) => { 

		return validateImage( image )

	} ) )

}


/*const fileValidations = [
	{
		methodName: "imageHasLocation",
		options: { required: true, passesWhen: true, abort: false },
		label: formatMessage( messages.file_validation_imageHasLocation_label ),
		description: formatMessage( messages.file_validation_imageHasLocation_description ),
		success: formatMessage( messages.file_validation_imageHasLocation_success ),
		error: formatMessage( messages.file_validation_imageHasLocation_error )
	},
	{
		methodName: "imageMinimumDimensions",
		options: { minimumDimensions: [ 800, 800 ], required: true, passenWhen: true, abort: false },
		label: formatMessage( messages.file_validation_imageMinimumDimensions_label ),
		description: formatMessage( messages.file_validation_imageMinimumDimensions_description ),
		success: formatMessage( messages.file_validation_imageMinimumDimensions_success ),
		error: formatMessage( messages.file_validation_imageMinimumDimensions_error )
	}
]*/

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


export function validateFiles ( e ) {

	return function ( dispatch ) {

		_promiseFilesSelected( e )
		.then( _promiseFilesAccepted )
		.then( ( files ) => {

			dispatch( {

				type: types.SET_REJECTED,
				images: files.filesRejected

			} )

			if( files.filesRejected.length > 0 ){

				dispatch( addSnackbarMessage( 'warning_some_files_rejected' ) ) // --> error.js
				
			}

			return files.filesAccepted

		} )
		.then( _promiseFilesValidated )
		.then( ( images ) => {

			let valid = []
			let action = []
			let invalid = []

			_.each( images, ( image ) => {

				if( image.status === 'valid' ){

					valid.push( image )

				}else if( image.status === 'action' ){

					action.push( image )

				}else if( image.status === 'invalid' ){

					invalid.push( image )

				}

			} )

			dispatch( {

				type: types.SET_VALID,
				images: valid

			} )

			dispatch( {

				type: types.SET_ACTION,
				images: action

			} )

			dispatch( {

				type: types.SET_INVALID,
				images: invalid

			} )

			if( invalid.length > 0 ){

				dispatch( addSnackbarMessage( 'warning_some_images_invalid' ) ) // --> error.js
				
			}

			return images

		} )
		.catch( ( error ) => {

			dispatch( addSnackbarMessage( error ) )

		} )

	}

}
