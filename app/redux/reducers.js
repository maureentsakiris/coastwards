import { combineReducers } from 'redux'
import * as types from 'types'

const language = ( state = { locale: 'en', dir: 'ltr', messages: {} }, action ) => {

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

const coastwards = combineReducers( {

	language,
	context

} )

export default coastwards