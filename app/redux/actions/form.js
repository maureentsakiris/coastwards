import * as types from 'types'
import { promiseType, promiseEXIF, promiseMinimumBoxDimensions, promiseCanvasBoxResize, promiseLocation } from 'actions/util/image'
import { promiseDataURLtoBlob } from 'actions/util/form'
import { promiseXHR } from 'actions/util/xhr'


const _promiseFile = ( e ) => {

	return new Promise( ( resolve, reject ) => {

		const selected = e.dataTransfer ? e.dataTransfer.files : e.currentTarget.files

		if( selected.length > 0 ){

			resolve( selected[ 0 ] )

		}else{

			reject( Error( 'files_undefined' ) )

		}

	} )

}

const _promiseLocation = ( image ) => {

	return new Promise( ( resolve, reject ) => {

		promiseLocation( image )
		.then( ( image ) => {

			image.manual = 0
			resolve( image )
			return image

		} )
		.catch( ( error ) => {

			if( error.message == 'location_undefined' ){

				// locateImage( image )
				image.manual = 1
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

			reject( error )

		} )

	} )

}


const _prepareForm = ( image ) => {

	return new Promise( ( resolve, reject ) => {

		promiseDataURLtoBlob( image.dataURL )
		.then( ( blob ) => {

			const { exifdata, lat, long, manual, labels } = image

			const devLabels = labels ? labels : {}

			let formData = new FormData()

			formData.append( 'file', blob, 'file.jpg' )
			formData.append( 'exifdata', JSON.stringify( exifdata ) )
			formData.append( 'lat', lat )
			formData.append( 'long', long )
			formData.append( 'manual', manual )
			formData.append( 'labels', JSON.stringify( devLabels ) )

			resolve( formData )
			return formData

		} )
		.catch( ( error ) => {

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
			//return _promiseSafe( image )
			return image

		} )
		.then( ( image ) => {

			dispatch( { type: types.SET_FILE_TO_UPLOAD, to: image } )
			return _prepareForm( image )

		} )
		.then( ( formData ) => {

			dispatch( { type: types.SET_FORM_DATA, to: formData } )
			dispatch( { type: types.SET_FORM_STATUS, to: 'status_hurray' } )
			return formData

		} )
		.catch( ( error ) => {

			dispatch( { type: types.SET_FORM_STATUS, to: error.message } )
			console.log( error )

		} )

	}

}


export const uploadImage = ( ) => {

	return function ( dispatch, getState ){

		dispatch( { type: types.SET_FORM_STATUS, to: 'status_uploading' } )

		const state = getState()
		const formData = state.form.formData

		let options = {

			data: formData,
			url: '/contribute/upload',
			onProgress: function ( e ) {

				let percent = parseInt( e.loaded / e.total * 100 )
				dispatch( { type: types.SET_UPLOAD_PROGRESS, to: percent } )

			}

		}

		promiseXHR( options )
		.then( ( response ) => {

			dispatch( { type: types.SET_FORM_STATUS, to: response } )
			return response

		} )
		.catch( ( error ) => {

			console.log( error )

		} )

	}

}
