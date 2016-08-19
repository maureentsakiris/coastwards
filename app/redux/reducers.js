import { combineReducers } from 'redux'
import * as types from 'types'

const language = ( state = { locale: 'en', dir: 'ltr', messages: undefined }, action ) => {

	switch ( action.type ){

	case types.LOAD_LANGUAGE:
		return { ...state, locale: action.locale, dir: action.dir, messages: action.messages }
	default:
		return state;

	}

}

const dialog = ( state = { title: 'Dialog title', message: 'This is a message' }, action ) => {

	switch ( action.type ){

	case types.SHOW_DIALOG:
		return { ...state, title: action.title, message: action.message }
	default:
		return state;

	}

}

const snackbar = ( state = { messages: [] }, action ) => {

	switch ( action.type ){

	case types.SET_SNACKBAR_MESSAGES:
		return { ...state, messages: action.messages }
	default:
		return state;

	}

}

const upload = ( state = { filesAccepted: [], filesRejected: [], imagesValid: [], imagesInvalid: [], status: 'select_images' }, action ) => {

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

	language,
	dialog,
	snackbar,
	upload

} )

export default coastwards