import { combineReducers } from 'redux'
import * as types from 'types'
import _ from 'underscore'

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

const upload = ( state = { filesAccepted: [], filesRejected: [], imagesValid: [], imagesInvalid: [], status: 'any_more_questions', mapboxSupported: true }, action ) => {

	switch ( action.type ){

	case types.SET_STATUS:
		return { ...state, status: action.status }
	case types.SET_FILES:
		return { ...state, filesAccepted: action.filesAccepted, filesRejected: action.filesRejected }
	case types.SET_IMAGES:
		return { ...state, imagesValid: action.imagesValid, imagesInvalid: action.imagesInvalid }
	default:
		return state;

	}

}

const coastwards = combineReducers( {

	i18n,
	dialog,
	snackbar,
	upload

} )

export default coastwards