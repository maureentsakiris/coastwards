import * as types from 'types'
import { promiseType, promiseEXIF, promiseMinimumBoxDimensions, promiseCanvasBoxResize, promiseLocation } from 'actions/util/image'
import { promiseDataURLtoBlob } from 'actions/util/form'
import { promiseXHR } from 'actions/util/xhr'

import _ from 'underscore'


const _resetForm = ( dispatch ) => {

	dispatch( { type: types.RESET_FORM } )
	document.getElementById( 'upload' ).reset()

}


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

			reject( error )

			/*if( error.message == 'location_undefined' ){

				locateImage( image )
				image.manual = 1
				resolve( image )

			}else{

				reject( error )

			}*/

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
							"maxResults": 1
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

			let annotations = response.responses[ 0 ]

			console.log( annotations )

			if( annotations.faceAnnotations ){

				reject( Error( "faces_detected" ) )

			}

			if( _.contains( annotations.safeSearchAnnotation, 'LIKELY' ) || _.contains( annotations.safeSearchAnnotation, 'VERY_LIKELY' ) ){

				reject( Error( "spam_detected" ) )

			}

			let coast = _.filter( annotations.labelAnnotations, { description: 'coast' } )
			let shore = _.filter( annotations.labelAnnotations, { description: 'shore' } )
			let harbor = _.filter( annotations.labelAnnotations, { description: 'harbor' } )

			if( !coast.length && !shore.length && !harbor.length ){

				reject( Error( "not_a_coast" ) )

			}
			
			image.labels = annotations.labelAnnotations
			resolve( image )
			return image

		} )
		.catch( ( error ) => {

			reject( error )

		} )

	} )

}


export const validateFile = ( e ) => {

	return function ( dispatch, getState ){

		const state = getState()

		dispatch( { type: types.SET_FORM_STATUS, to: 'status_validating' } )

		_promiseFile( e ) //eslint-disable-line promise/always-return
		.then( promiseType )
		.then( ( file ) => {

			//MATTHIAS
			let index = state.selected.indexOf( file.name )

			if( index == -1 ){

				dispatch( { type: types.ADD_SELECTED, file: file.name } )
				return file

			}else{

				throw Error( 'duplicate_file' )

			}

		} )
		.then( promiseEXIF )
		.then( ( image ) => {

			return promiseMinimumBoxDimensions( image, 800 )

		} )
		.then( ( image ) => {

			return promiseCanvasBoxResize( image, 400 )

		} )
		.then( ( image ) => {

			return _promiseSafe( image )
			//return image

		} )
		.then( _promiseLocation )
		.then( ( image ) => {

			dispatch( { type: types.SET_IMAGE_TO_UPLOAD, to: image } )
			dispatch( { type: types.SET_FORM_STATUS, to: 'status_hurray' } )
			return image

		} )
		.catch( ( error ) => {

			dispatch( { type: types.SET_FORM_STATUS, to: error.message } )
			_resetForm( dispatch )
			console.log( error )

		} )

	}

}



export const setMaterial = ( e ) => {

	return function ( dispatch ){

		dispatch( { type: types.SET_MATERIAL, to: e.currentTarget.value } )

	}

}


export const uploadImage = ( ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const { image, material, comment, hashtag } = state.form

		promiseDataURLtoBlob( image.dataURL )
		.then( ( blob ) => {

			const { exifdata, lat, long, manual, labels } = image
			const devLabels = labels ? labels : {}
			const datetime = exifdata.DateTimeOriginal || exifdata.DateTimeDigitized || exifdata.DateTime

			let formData = new FormData()

			formData.append( 'file', blob, 'file.jpg' )
			formData.append( 'exifdata', JSON.stringify( exifdata ) )
			formData.append( 'lat', lat )
			formData.append( 'long', long )
			formData.append( 'manual', manual )
			formData.append( 'datetime', datetime )
			formData.append( 'labels', JSON.stringify( devLabels ) )
			formData.append( 'material', material )
			formData.append( 'comment', comment )
			formData.append( 'hashtag', hashtag )
			

			return formData

		} )
		.then( ( formData ) => {

			let options = {

				data: formData,
				url: '/contribute/upload',
				onProgress: function ( e ) {

					let percent = parseInt( e.loaded / e.total * 100 )
					dispatch( { type: types.SET_UPLOAD_PROGRESS, to: percent } )

				}

			}

			dispatch( { type: types.SET_FORM_STATUS, to: 'status_uploading' } )
			return promiseXHR( options )

		} )
		.then( ( response ) => {

			dispatch( { type: types.SET_FORM_STATUS, to: response } )
			dispatch( { type: types.RESET_FORM } )
			return response

		} )
		.catch( ( error ) => {

			dispatch( { type: types.SET_FORM_STATUS, to: 'upload_error' } )
			_resetForm( dispatch )
			console.log( error )

		} )

	}

}
