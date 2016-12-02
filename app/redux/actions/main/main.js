import * as types from 'types'
import { promiseType, promiseEXIF, promiseMinimumBoxDimensions, promiseCanvasBoxResize, promiseLocation/*, promiseDateTime*/ } from 'actions/util/image'
import { addSnackbarMessage } from 'actions/ui/snackbar'
import { promiseDataURLtoBlob } from 'actions/util/form'
import { scrollToId } from 'actions/context'
import { promiseXHR } from 'actions/util/request/xhr'
import { fly, resetMap, hidePopup, switchModus, dropMarker, trackZoom } from 'actions/main/mapbox'
import uuid from 'node-uuid'
import _ from 'underscore'
/*import Hammer from 'hammerjs'*/



const _promiseFiles = ( e ) => {

	return new Promise( ( resolve, reject ) => {

		const selected = e.dataTransfer ? e.dataTransfer.files : e.currentTarget.files

		if( selected.length > 0 ){

			resolve( selected )

		}else{

			reject( Error( 'files_undefined' ) ) //YES

		}

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

			if( annotations.faceAnnotations ){

				reject( Error( "faces_detected" ) ) //YES

			}

			if( _.contains( annotations.safeSearchAnnotation, 'LIKELY' ) || _.contains( annotations.safeSearchAnnotation, 'VERY_LIKELY' ) ){
 
				reject( Error( "spam_detected" ) ) //YES

			}

			let coast = _.filter( annotations.labelAnnotations, { description: 'coast' } )
			let shore = _.filter( annotations.labelAnnotations, { description: 'shore' } )
			let harbor = _.filter( annotations.labelAnnotations, { description: 'harbor' } )
			let natural_environment = _.filter( annotations.labelAnnotations, { description: 'natural environment' } )

			if( !coast.length && !shore.length && !harbor.length && !natural_environment.length ){

				reject( Error( "not_a_coast" ) ) //YES

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

				image.manual = 1
				resolve( image )

			}else{

				reject( error )

			}

		} )

	} )

}

export const validateFile = ( e ) => {

	return function ( dispatch, getState ){

		let state = getState()
		let map = state.mapbox.map
		let jazzSupported = state.browser.jazzSupported

		if( jazzSupported ) {

			map.stop()
			dispatch( hidePopup() )
			dispatch( clipPage() )

		}

		dispatch( { type: types.SET_STATUS_MSG, to: 'status_validating' } )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'statuses', to: true } )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'prompts', to: false } )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'errors', to: false } )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'upload', to: false } )



		_promiseFiles( e ) //eslint-disable-line promise/always-return
		.then( ( selected ) => {

			if( selected.length > 1 ){

				dispatch( addSnackbarMessage( 'selected_truncated' ) )

			}

			return selected[ 0 ]

		} )
		.then( promiseType )
		.then( ( file ) => {

			//MATTHIAS
			/*let index = state.selected.indexOf( file.name )

			if( index == -1 ){

				dispatch( { type: types.ADD_SELECTED, file: file.name } )
				return file

			}else{

				throw Error( 'duplicate_file' ) //YES

			}*/

			return file

		} )
		.then( promiseEXIF )
		.then( ( image ) => {

			return promiseMinimumBoxDimensions( image, state.config.imageWidth )

		} )
		/*.then( ( image ) => {

			return promiseDateTime( image )

		} )*/
		.then( ( image ) => {

			return promiseCanvasBoxResize( image, state.config.imageWidth )

		} )
		.then( ( image ) => {

			if( state.config.google ){

				return _promiseSafe( image )

			}else{

				return image

			}

		} )
		.then( _promiseLocation )
		.then( ( image ) => {

			const uid = uuid.v1()
			dispatch( { type: types.SET_UID, to: uid } )

			dispatch( { type: types.SET_IMAGE_TO_UPLOAD, to: image } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'statuses', to: false } )

			if( image.manual == 0 ){

				if( state.browser.jazzSupported ){

					dispatch( dropMarker( image ) )

					dispatch( addSnackbarMessage( 'here_we_go', 5000 ) )
					dispatch( fly( [ image.long, image.lat ], 15 ) )

					map.once( 'moveend', () => {

						dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'statuses', to: false } )
						dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'form', to: true } )

					} )

				}else{

					dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'statuses', to: false } )
					dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'form', to: true } )

				}

			} else if ( image.manual == 1 && state.browser.jazzSupported ){

				dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'locate', to: true } )

			}else{

				throw Error( 'location_undefined' )

			}

			return image

		} )
		.catch( ( error ) => {

			dispatch( resetMain() )
			dispatch( { type: types.SET_ERROR_MSG, to: error.message } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'errors', to: true } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'prompts', to: false } )
			console.log( error )

		} )

	}

}


export const showMarker = ( ) => {

	return function ( dispatch ){


		dispatch( trackZoom( 'on' ) )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'locate', to: false } )
		dispatch( switchModus( 'locate' ) )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'marker', to: true } )
		dispatch( addSnackbarMessage( 'zoom_until', 7000 ) )


	}

}

export const setLocation = ( ) => {

	return function ( dispatch, getState ){

		let state = getState()
		let map = state.mapbox.map
		let image = state.form.image
		let center = map.getCenter()

		image.lat = center.lat
		image.long = center.lng

		dispatch( trackZoom( 'off' ) )
		dispatch( dropMarker( image ) )
		dispatch( { type: types.SET_IMAGE_TO_UPLOAD, to: {} } )
		dispatch( { type: types.SET_IMAGE_TO_UPLOAD, to: image } )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'marker', to: false } )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'form', to: true } )
		dispatch( scrollToMap() )

	}

}

export const setMaterial = ( e ) => {

	return function ( dispatch ){

		dispatch( { type: types.SET_MATERIAL, to: e.currentTarget.value } )

	}

}

export const setAdaptation = ( e ) => {

	return function ( dispatch ){

		dispatch( { type: types.SET_ADAPTATION, to: e.currentTarget.value } )

	}

}

export const setComment = ( e ) => {

	return function ( dispatch ){

		dispatch( { type: types.SET_COMMENT, to: e.currentTarget.value } )

	}

}

export const setHashtag = ( e ) => {

	return function ( dispatch ){

		dispatch( { type: types.SET_HASHTAG, to: e.currentTarget.value } )

	}

}

export const uploadImage = ( ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const { image } = state.form

		promiseDataURLtoBlob( image.dataURL )
		.then( ( blob ) => {

			const { image, material, adaptation, comment, hashtag, uid } = state.form

			const { exifdata, lat, long, manual, labels } = image

			//UPDATE ALSO IN FORMDATA.JSX
			const cleanExif = _.omit( image.exifdata, [ 'MakerNote', 'undefined' ] )

			const devLabels = labels ? labels : {}
			const datetime = exifdata.DateTimeOriginal || exifdata.DateTimeDigitized || exifdata.DateTime

			let formData = new FormData()

			formData.append( 'file', blob, uid + '.jpg' )
			formData.append( 'exifdata', JSON.stringify( cleanExif ) )
			formData.append( 'lat', lat )
			formData.append( 'long', long )
			formData.append( 'manual', manual )
			formData.append( 'uid', uid )
			formData.append( 'datetime', datetime )
			formData.append( 'labels', JSON.stringify( devLabels ) )
			formData.append( 'material', material )
			formData.append( 'adaptation', adaptation )
			formData.append( 'comment', comment )
			formData.append( 'hashtag', hashtag )

			//UPDATE the table in formdata.jsx if something changes here!!!!
			

			return formData

		} )
		.then( ( formData ) => {

			/*for ( var pair of formData.entries() ) {

				console.log( pair[ 0 ]+ ', ' + pair[ 1 ] )

			}*/

			let options = {

				data: formData,
				url: '/contribute/upload',
				onProgress: function ( e ) {

					let percent = parseInt( e.loaded / e.total * 100 )
					dispatch( { type: types.SET_UPLOAD_PROGRESS, to: percent } )

				}

			}

			dispatch( { type: types.SET_STATUS_MSG, to: 'status_uploading' } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'statuses', to: true } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'form', to: false } )

			return promiseXHR( options )

		} )
		.then( ( response ) => {

			dispatch( resetMain( false ) )
			dispatch( { type: types.SET_PROMPT_MSG, to: response } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'prompts', to: true } )

			return response

		} )
		.catch( ( error ) => {

			dispatch( resetMain() )
			dispatch( { type: types.SET_ERROR_MSG, to: 'upload_error' } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'errors', to: true } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'prompts', to: false } )
			console.log( error )

		} )

	}

}

export const resetMain = ( removeLastUpload = true ) => {

	return function ( dispatch, getState ){

		const state = getState()

		//console.log( "TOTAL RESET" );

		document.getElementById( 'Upload' ).reset()
		document.getElementById( 'Form' ).reset()
		
		//close what else toggle 
		dispatch( { type: types.SET_PROMPT_MSG, to: 'select_file' } )
		dispatch( { type: types.RESET_FORM } )
		dispatch( { type: types.RESET_LAYERS } )

		if( state.browser.jazzSupported ){

			document.getElementById( 'Sheet' ).scrollTop = 0
			dispatch( resetMap() )

			if( removeLastUpload ){ // shouldn't remove when error is duplicate_file

				dispatch( { type: types.REMOVE_LAST_DROP } )

				let state = getState()
				
				let data = {

					"type": "FeatureCollection",
					"features": state.drops

				}

				state.mapbox.map.getSource( 'drops' ).setData( data )

			}

		}

	}

}

/*export const scrollUp = ( ) => {

	return function ( dispatch, getState ) {

		dispatch( unclipPage() )

		let state = getState()
		let { errors, form, geolocator, locate, prompts, statuses } = state.layers

		window.scroll( {

			top: 0, 
			left: 0, 
			behavior: 'smooth' 

		} )

		if( !errors && !form && !geolocator && !locate && !prompts && !statuses ){
	
			dispatch( { type: types.SET_PROMPT_MSG, to: 'select_file' } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'prompts', to: true } )

		}

	}

}
*/
export const scrollToMap = ( ) => {

	return function () {

		window.scroll( {

			top: document.body.scrollHeight, 
			left: 0, 
			behavior: 'smooth' 

		} )

	}

}

export const openInput = ( ) => {

	return function ( dispatch ) {

		let input = document.getElementById( "images" )
		input.click()
		dispatch( clipPage() )

	}

}

export const clipPage = ( ) => {

	return function ( dispatch ){

		//window.dispatchEvent( new Event( 'resize' ) )

		dispatch( { type: 'CLIP_PAGE' } )
		dispatch( scrollToMap() )

	}

}

export const unclipPage = ( e ) => {

	return function ( dispatch, getState ){

		let state = getState()
		let { errors, form, geolocator, locate, prompts, statuses } = state.layers

		if( !errors && !form && !geolocator && !locate && !prompts && !statuses ){
	
			dispatch( { type: types.SET_PROMPT_MSG, to: 'select_file' } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'prompts', to: true } )

		}

		dispatch( { type: 'UNCLIP_PAGE' } )

		scrollToId( 'Intro', e )

		/*window.location.href = '#Main'
		scrollToId( 'Info', e )*/

	}

}

export const disableAndreasPinch = ( ) => {

	return function ( dispatch ){

		//let stage = document.getElementById( 'Body' )

		/*var mc = new Hammer.Manager( stage, { touchAction: 'pan-y' } )
		mc.add( new Hammer.Pinch( { event: 'AndreasPinch', pointers: 0, threshold: 0 } ) )

		mc.on( 'AndreasPinch', ( e ) => {

			e.preventDefault()

		} )*/

		//https://stackoverflow.com/questions/40345723/how-does-one-prevent-pinch-zooming-on-ios-10-devices-in-safari
		document.documentElement.addEventListener( 'touchstart', function ( e ) {

			if ( e.touches.length > 1 ) {

				e.preventDefault()

			}

			if ( e.touches.length > 2  && true ) { //map visible

				e.preventDefault()
				dispatch( addSnackbarMessage( 'two_fingers' ) )

			}

		}, true )

	}

}
