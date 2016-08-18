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

const context = ( state = { title: 'Dialog title', message: 'This is a message' }, action ) => {

	switch ( action.type ){

	case types.SHOW_DIALOG:
		return { ...state, title: action.title, message: action.message }
	default:
		return state;

	}

}

const upload = ( state = { selectedFiles: {}, status: 'select_images' }, action ) => {

	switch ( action.type ){

	case types.SET_STATUS:
		return { ...state, status: action.status }
	case types.SET_SELECTED_FILES:
		return { ...state, selectedFiles: action.selectedFiles }
	default:
		return state;

	}

}

const coastwards = combineReducers( {

	language,
	context,
	upload

} )

export default coastwards