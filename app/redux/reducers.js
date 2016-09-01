import { combineReducers } from 'redux'
import * as types from 'types'
import _ from 'underscore'
import Modernizr from 'modernizr'


const uploadSupported = Modernizr.xhr2 || Modernizr.xhrresponsetypejson || Modernizr.filereader || Modernizr.blob

const browser = ( state = { uploadSupported: uploadSupported, mapboxSupported: false }, action ) => {

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

const dialog = ( state = { title: '', message: '', active: false }, action ) => {

	switch ( action.type ){

	case types.SHOW_DIALOG:
		return { ...state, title: action.title, message: action.message, active: true }
	case types.HIDE_DIALOG:
		return { ...state, title: '', message: '', active: false }
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

const form = ( state = { status: '', image: {}, material: '', comment: '', hashtag: '', progress: 0 }, action ) => {

	switch ( action.type ){

	case types.SET_FORM_STATUS:
		return _.extend( {}, state, { status: action.to } )
	case types.SET_IMAGE_TO_UPLOAD:
		return _.extend( {}, state, { image: action.to } )
	case types.SET_FORM_DATA:
		return _.extend( {}, state, { formData: action.to } )
	case types.SET_MATERIAL:
		return _.extend( {}, state, { material: action.to } )
	case types.SET_COMMENT:
		return _.extend( {}, state, { comment: action.to } )
	case types.SET_HASHTAG:
		return _.extend( {}, state, { hashtag: action.to } )
	case types.SET_UPLOAD_PROGRESS:
		return _.extend( {}, state, { progress: action.to } )
	case types.RESET_FORM:
		return _.extend( {}, state, { image: {}, material: '', comment: '', hashtag: '', progress: 0 } )
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

const coastwards = combineReducers( {

	browser,
	i18n,
	dialog,
	snackbar,
	form,
	selected

} )

export default coastwards