import * as types from 'types'
import { promiseType, promiseEXIF, promiseMinimumBoxDimensions, promiseCanvasBoxResize, promiseLocation, promiseDataURLtoBlob } from 'actions/util/image'
import { promiseXHR } from 'actions/util/xhr'

const _promiseFile = ( e ) => {

	return new Promise( ( resolve, reject ) => {

		const selected = e.dataTransfer ? e.dataTransfer.files : e.currentTarget.files;

		if( selected.length > 0 ){

			resolve( selected[ 0 ] );

		}else{

			reject( Error( 'actions/form.js/_promiseFilesSelected/selected.length = 0' ) );

		}

	} )

}

const _promiseLocation = ( image ) => {

	return new Promise( ( resolve, reject ) => {

		promiseLocation( image )
		.then( ( image ) => {

			image.manual = false
			resolve( image )
			return image

		} )
		.catch( ( error ) => {

			if( error.message == 'location_undefined' ){

				console.log( "Prompt user to locate image" )
				// locateImage( image )
				image.manual = true
				resolve( image )

			}else{

				reject( error )

			}

		} )

	} )

}

const _promiseSafe = ( image ) => {

	return new Promise ( ( resolve, reject ) => {

		let content = image.dataURL.replace( 'data:image/jpeg;base64,', '' ) // remove content type
		let data = JSON.stringify( {

			"requests":[
				{
					"image": { "content": content },
					"features":[
						{
							"type":"FACE_DETECTION",
							"maxResults":1
						},
						{
							"type":"LABEL_DETECTION"
						},
						{
							"type":"SAFE_SEARCH_DETECTION"
						}

					]
				}
			]
		} )

		let options = { 

			url: 'https://vision.googleapis.com/v1/images:annotate?fields=responses&key=AIzaSyBL_zQUvMQNSnljycIZbHTYvscgYNLsp50',
			data: data

		}

		promiseXHR( options )
		.then( JSON.parse )
		.then( ( response ) => {

			let labels = response.responses[ 0 ].labelAnnotations
			image.labels = labels
			resolve( image )
			return image

		} )
		.catch( ( error ) => {

			console.log( error )
			reject( error )

		} )

	} )

}


export const validateFile = ( e ) => {

	return function ( dispatch ){

		dispatch( { type: types.SET_FORM_STATUS, to: 'status_validating' } )

		_promiseFile( e )
		.then( promiseType )
		.then( promiseEXIF )
		.then( ( image ) => {

			return promiseMinimumBoxDimensions( image, 800 )

		} )
		.then( ( image ) => {

			return promiseCanvasBoxResize( image, 800 )

		} )
		.then( _promiseLocation )
		.then( ( image ) => {

			//dispatch( { type: types.SET_FORM_PREVIEW, to: image.dataURL } )
			return _promiseSafe( image )
			//return image

		} )
		.then( ( image ) => {

			dispatch( { type: types.SET_FORM_STATUS, to: 'status_hurray' } )
			dispatch( { type: types.SET_FILE_TO_UPLOAD, to: image } )
			return image

		} )
		.catch( ( error ) => {

			dispatch( { type: types.SET_FORM_STATUS, to: error.message } )
			console.log( error )

		} )

	}

}


const _promiseFormData = ( blob, fileObj ) => {

	return new Promise( ( resolve, reject ) => {

		const { exifdata, lat, long, manual, name, labels } = fileObj

		let formData = new FormData()

		formData.append( 'file', blob )
		formData.append( 'exifdata', JSON.stringify( exifdata ) )
		formData.append( 'lat', lat )
		formData.append( 'long', long )
		formData.append( 'manual', manual )
		formData.append( 'filename', name )
		formData.append( 'labels', JSON.stringify( labels ) )

		resolve( formData )

	} )

}

export const uploadImage = ( e ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const fileObj = state.form.file

		promiseDataURLtoBlob( fileObj.dataURL )
		.then( ( blob ) => {

			return _promiseFormData( blob, fileObj )

		} )
		.then( ( formData ) => {

			for ( var pair of formData.entries() ) {

				console.log( pair[ 0 ]+ ', ' + pair[ 1 ] )

			}
			return formData

		} )
		.catch( ( error ) => {

			console.log( error )

		} )

		dispatch( { type: types.SET_FORM_STATUS, to: 'status_uploading' } )

	}

}


/*let drop = {

			file: file,
			exifJSON: JSON.stringify( exifdata ),
			validationsJSON: JSON.stringify( validations ),
			validations: validations,
			manual: 0,
			exifDateTime: exifdata.DateTimeOriginal || exifdata.DateTimeDigitized || exifdata.DateTime

		}*/