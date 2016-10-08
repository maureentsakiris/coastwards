import { combineReducers } from 'redux'
import * as types from 'types'
import _ from 'underscore'
import Modernizr from 'modernizr'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'


Modernizr.addTest( 'draganddrop', function () {

	var div = document.createElement( 'div' )
	return ( 'draggable' in div ) || ( 'ondragstart' in div && 'ondrop' in div )

} )

Modernizr.addTest( 'mapbox', function () {

	return mapboxgl.supported()

} )

const uploadSupported = Modernizr.xhr2 && Modernizr.filereader && Modernizr.blobconstructor && Modernizr.canvas 
const jazzSupported = Modernizr.mapbox && Modernizr.draganddrop && Modernizr.flexbox && Modernizr.flexwrap && Modernizr.csspointerevents && Modernizr.cssanimations && true

const browser = ( state = { uploadSupported: uploadSupported, jazzSupported: jazzSupported }, action ) => {

	switch ( action.type ){

	default:
		return state;

	}

}

const config = ( state= { google: true, imageWidth: 800 }, action ) => {

	switch ( action.type ){

	default:
		return state;

	}

}

const i18n = ( state = { locale: 'en', dir: 'ltr', messages: undefined }, action ) => {

	switch ( action.type ){

	case types.LOAD_LANGUAGE:
		return { ...state, locale: action.locale, dir: action.dir, messages: action.messages }
	default:
		return state;

	}

}

const dialog = ( state = { component: '', active: false }, action ) => {

	switch ( action.type ){

	case types.SHOW_DIALOG:
		return { ...state, component: action.component, active: true }
	case types.HIDE_DIALOG:
		return { ...state, component: '', active: false }
	default:
		return state;

	}

}

const snackbar = ( state = [ ], action ) => {

	switch ( action.type ){

	case types.ADD_SNACKBAR_MESSAGE:
		return [ ...state, action.message ]
	case types.REMOVE_SNACKBAR_MESSAGE:
		return _.without( state, action.message )
	default:
		return state;

	}

}

const layers = ( state = { upload: true, prompts: true, statuses: false, errors: false, locate: false, geolocaterm: false, form: false }, action ) => {

	switch ( action.type ){

	case types.SET_LAYER_VISIBILITY:
		return _.extend( {}, state, { [ action.layer ]: action.to } )
	case types.RESET_LAYERS:
		return { upload: true, prompts: true, statuses: false, errors: false, locate: false, geolocaterm: false, form: false }
	default: 
		return state

	}

}

const prompt = ( state = 'select_file', action ) => {

	switch ( action.type ){

	case types.SET_PROMPT_MSG:
		return action.to
	default:
		return state

	}

}

const status = ( state = '', action ) => {

	switch ( action.type ){

	case types.SET_STATUS_MSG:
		return action.to
	default:
		return state

	}

}

const error = ( state = '', action ) => {

	switch ( action.type ){

	case types.SET_ERROR_MSG:
		return action.to
	default:
		return state

	}

}

const form = ( state = { image: {}, material: '', uid: '', adaptation: '', comment: '', hashtag: '', progress: 0 }, action ) => {

	switch ( action.type ){

	case types.SET_IMAGE_TO_UPLOAD:
		return _.extend( {}, state, { image: action.to } )
	case types.SET_MATERIAL:
		return _.extend( {}, state, { material: action.to } )
	case types.SET_UID:
		return _.extend( {}, state, { uid: action.to } )
	case types.SET_ADAPTATION:
		return _.extend( {}, state, { adaptation: action.to } )
	case types.SET_COMMENT:
		return _.extend( {}, state, { comment: action.to } )
	case types.SET_HASHTAG:
		return _.extend( {}, state, { hashtag: action.to } )
	case types.SET_UPLOAD_PROGRESS:
		return _.extend( {}, state, { progress: action.to } )
	case types.RESET_FORM:
		return _.extend( {}, state, { image: {}, material: '', uid: '', comment: '', hashtag: '', progress: 0 } )
	default:
		return state

	}

} 

const selected = ( state = [ ], action ) => {

	switch ( action.type ){

	case types.ADD_SELECTED:
		return [ ...state, action.file ]
	default: 
		return state

	}

}

const mapbox = ( state = { center: [ 0, 39 ], zoom: 0 }, action ) => {

	switch ( action.type ){

	case types.FLY_TO:
		return _.extend( {}, state, { center: action.center, zoom: action.zoom } )
	case types.RESET_MAP:
		return _.extend( {}, state, { center: [ 0, 39 ], zoom: 0 } )
	default:
		return state

	}

} 


const coastwards = combineReducers( {

	browser,
	config,
	i18n,
	dialog,
	snackbar,
	layers,
	prompt,
	status,
	error,
	form,
	selected,
	mapbox

} )

export default coastwards