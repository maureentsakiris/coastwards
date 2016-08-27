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

const form = ( state = { status: '', file: {}, progress: 0, preview: '' }, action ) => {

	switch ( action.type ){

	case types.SET_FORM_STATUS:
		return _.extend( {}, state, { status: action.to } )
	case types.SET_FILE_TO_UPLOAD:
		return _.extend( {}, state, { file: action.to } )
	case types.SET_FORM_DATA:
		return _.extend( {}, state, { formData: action.to } )
	case types.SET_UPLOAD_PROGRESS:
		return _.extend( {}, state, { progress: action.to } )
	case types.SET_FORM_PREVIEW:
		return _.extend( {}, state, { preview: action.to } )
	default:
		return state;

	}

} 



const coastwards = combineReducers( {

	browser,
	i18n,
	dialog,
	snackbar,
	form

} )

export default coastwards