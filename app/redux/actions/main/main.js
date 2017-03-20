import * as types from 'types'
import { promiseType, promiseEXIF, promiseMinimumWidth, promiseCanvasBoxResize, promiseLocation/*, promiseDateTime*/ } from 'actions/util/image'
import { setSnackbarMessage, dismissSnackbar } from 'actions/ui/snackbar'
import { promiseDataURLtoBlob } from 'actions/util/form'
import { scrollToId } from 'actions/context'
import { promiseXHR } from 'actions/util/request/xhr'
import { promiseGet, promiseJSONOK } from 'actions/util/request/get'
import { fly, resetMap, hidePopup, /*switchModus,*/ addDropMarker, removeLastDrop, addUploadMarker, setMarkerVisibility, trackZoom/*, hideSatellite*/ } from 'actions/main/mapbox'
import uuid from 'uuid'
import _ from 'underscore'

export const getCount = ( ) => {

	return function ( dispatch ){

		promiseGet( '/contribute/count' )
		.then( JSON.parse )
		.then( ( parsed ) => {

			dispatch( { type: types.SET_COUNT, to: parsed.count } )
			return parsed.count

		} )
		.catch( ( error ) => {

			console.log( error );

		} )

	}

}


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

const _promiseMake = ( image, blacklist ) => {

	return new Promise ( ( resolve, reject ) => {

		if( image.exifdata.Make ){

			let filtered = _.indexOf( blacklist, image.exifdata.Make )

			if( filtered != -1 ){

				reject( Error( 'make_blacklisted' ) )

			}else{

				resolve( image )

			}

		}else{

			resolve( image )

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

			if( response.error ){

				reject( Error( "problems_from_google" ) )

			}

			let annotations = response.responses[ 0 ]

			console.log( annotations );

			if( annotations.faceAnnotations ){

				reject( Error( "faces_detected" ) ) //YES

			}

			if( _.contains( annotations.safeSearchAnnotation, 'LIKELY' ) || _.contains( annotations.safeSearchAnnotation, 'VERY_LIKELY' ) ){
 
				reject( Error( "spam_detected" ) ) //YES

			}


			let coast = _.filter( annotations.labelAnnotations, { description: 'coast' } )
			let shore = _.filter( annotations.labelAnnotations, { description: 'shore' } )
			let harbor = _.filter( annotations.labelAnnotations, { description: 'harbor' } )
			let beach = _.filter( annotations.labelAnnotations, { description: 'beach' } )
			let sea = _.filter( annotations.labelAnnotations, { description: 'sea' } )
			let bodyofwater = _.filter( annotations.labelAnnotations, { description: 'body of water' } )
			let natural_environment = _.filter( annotations.labelAnnotations, { description: 'natural environment' } )
			let geographical_feature = _.filter( annotations.labelAnnotations, { description: 'geographical feature' } )
			let loch = _.filter( annotations.labelAnnotations, { description: 'loch' } )
			/*let habitat = _.filter( annotations.labelAnnotations, { description: 'habitat' } )
			let landform = _.filter( annotations.labelAnnotations, { description: 'landform' } )*/

			if( !coast.length && !shore.length && !harbor.length && !beach.length && !sea.length && !natural_environment.length && !bodyofwater.length && !geographical_feature.length && !loch.length/*&& !habitat.length && !landform.length*/ ){

				reject( Error( "not_a_coast" ) ) //YES

			}
			
			image.labels = annotations.labelAnnotations
			resolve( image )
			return image

		} )
		.catch( ( error ) => {

			console.log( error )
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

				console.log( error )
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

		dispatch( { type: types.SET_USER_ACTION, to: 'uploading' } )
		dispatch( { type: types.SET_STATUS_MSG, to: 'status_validating' } )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'statuses', to: true } )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'prompts', to: false } )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'errors', to: false } )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'upload', to: false } )



		_promiseFiles( e ) //eslint-disable-line promise/always-return
		.then( ( selected ) => {

			if( selected.length > 1 ){

				dispatch( setSnackbarMessage( 'selected_truncated' ) )

			}

			return selected[ 0 ]

		} )
		.then( ( file ) => {

			return promiseType( file )

		} )
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

			return promiseMinimumWidth( image, state.config.imageWidth )

		} )
		.then( ( image ) => {

			return _promiseMake( image, state.config.makeBlacklist )

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

					dispatch( addDropMarker( image ) )
					dispatch( setMarkerVisibility( 'none' ) )

					dispatch( setSnackbarMessage( 'here_we_go', 4000 ) )
					dispatch( fly( [ image.long, image.lat ], 14 ) )

					map.once( 'moveend', () => {

						//dispatch( showMarker() )

						//dispatch( switchModus( 'locate' ) )
						//dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'satellite', to: true } )
						
						dispatch( setSnackbarMessage( 'location_right', 0, { label: 'yes', action: showForm()  }, { label: 'no', action: showMarker( true ) } ) )

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

			let msg = error.message ? error.message : 'an_error_occurred'
			dispatch( { type: types.SET_ERROR_MSG, to: msg } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'errors', to: true } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'prompts', to: false } )
			console.log( error )

		} )

	}

}

export const showForm = () => {

	return function ( dispatch ){

		dispatch( dismissSnackbar() )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'statuses', to: false } )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'form', to: true } )
		//dispatch( hideSatellite() )
		//dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'satellite', to: false } )

	}

}


export const showMarker = ( removeLastMarker = false ) => {

	return function ( dispatch ){

		if( removeLastMarker ){

			dispatch( removeLastDrop() )

		}
		//dispatch( switchModus( 'locate' ) )
		dispatch( trackZoom( 'on' ) )
		dispatch( setMarkerVisibility( 'none' ) )
		//dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'satellite', to: true } )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'locate', to: false } )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'marker', to: true } )
		dispatch( setSnackbarMessage( 'zoom_until', 0, { label: 'continue_upload', action: setLocation() }, { label: 'cancel_upload', action: resetMain() }  ) )

	}

}

export const setLocation = ( ) => {

	return function ( dispatch, getState ){

		let state = getState()
		let map = state.mapbox.map

		if( state.mapbox.zoom < 14 ) {

			dispatch( setSnackbarMessage( 'zoom_closer', 0, { label: 'continue_upload', action: setLocation() }, { label: 'cancel_upload', action: resetMain() }  ) )

		}else{

			let image = state.form.image
			let center = map.getCenter()

			image.lat = center.lat
			image.long = center.lng

			dispatch( trackZoom( 'off' ) )
			dispatch( addDropMarker( image ) )
			dispatch( { type: types.SET_IMAGE_TO_UPLOAD, to: {} } )
			dispatch( { type: types.SET_IMAGE_TO_UPLOAD, to: image } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'marker', to: false } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'form', to: true } )
			dispatch( dismissSnackbar() )
			//dispatch( hideSatellite() )
			//dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'satellite', to: false } )
			//dispatch( scrollToMap() )

		}

	}

}

export const setMaterial = ( e ) => {

	const value = typeof( e ) === 'string' ? e : e.currentTarget.value

	return function ( dispatch ){

		dispatch( { type: types.SET_MATERIAL, to: value } )

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
			const cleanExif = _.omit( image.exifdata, [ 'MakerNote', 'undefined', 'Artist', 'Copyright' ] )

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
		.then( JSON.parse )
		.then( promiseJSONOK )
		.then( ( parsed ) => {

			dispatch( resetMain() )

			const upload = JSON.parse( parsed.formData )
			const image = {

				lat: upload.fields.lat,
				long: upload.fields.long,
				id: upload.insertId

			}

			dispatch( addUploadMarker( image ) )
			dispatch( { type: types.SET_PROMPT_MSG, to: 'upload_ok' } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'prompts', to: true } )

			return parsed

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

export const resetMain = ( ) => {

	return function ( dispatch, getState ){

		const state = getState()

		//console.log( "TOTAL RESET" );

		document.getElementById( 'Upload' ).reset()
		document.getElementById( 'Form' ).reset()
		
		//close what else toggle 
		dispatch( dismissSnackbar() )
		dispatch( { type: types.SET_USER_ACTION, to: 'prompt' } )
		dispatch( { type: types.SET_PROMPT_MSG, to: 'select_file' } )
		dispatch( { type: types.RESET_FORM } )
		dispatch( { type: types.RESET_LAYERS } )

		

		if( state.browser.jazzSupported ){

			document.getElementById( 'Sheet' ).scrollTop = 0
			dispatch( resetMap() )
			dispatch( removeLastDrop() )

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

		dispatch( { type: 'CLIP_PAGE' } )
		dispatch( scrollToMap() )
		//window.dispatchEvent( new Event( 'resize' ) ) <-- Throws error on fucking IE11
		/*if ( navigator.userAgent.indexOf( 'MSIE' ) !== -1 || navigator.appVersion.indexOf( 'Trident/' ) > 0 ) {

			var evt = document.createEvent( 'UIEvents' )
			evt.initUIEvent( 'resize', true, false, window, 0 )
			window.dispatchEvent( evt )

		} else {

			window.dispatchEvent( new Event( 'resize' ) )

		}*/

	}

}

export const unclipPage = ( ) => {

	return function ( dispatch, getState ){

		let state = getState()
		let { errors, form, geolocator, locate, prompts, statuses } = state.layers

		if( !errors && !form && !geolocator && !locate && !prompts && !statuses ){
	
			dispatch( { type: types.SET_PROMPT_MSG, to: 'select_file' } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'prompts', to: true } )

		}

		dispatch( hidePopup() )
		dispatch( { type: 'UNCLIP_PAGE' } )
		dispatch( { type: types.SET_USER_ACTION, to: 'prompt' } )
		//dispatch( { type: types.SET_SCROLL_Y, to: 1 } )

		//window.dispatchEvent( new Event( 'scroll' ) )
		dispatch( scrollToId( 'Body' ) )

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
				dispatch( setSnackbarMessage( 'two_fingers' ) )

			}

		}, true )

	}

}
