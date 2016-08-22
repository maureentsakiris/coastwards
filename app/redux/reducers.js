import { combineReducers } from 'redux'
import * as types from 'types'
import _ from 'underscore'
import Modernizr from 'modernizr'


const formData = Modernizr.xhr2 || Modernizr.xhrresponsetypejson || Modernizr.filereader

const browser = ( state = { formData: formData, mapbox: false }, action ) => {

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

const rejected = ( state = [ ], action ) => {

	switch ( action.type ){

	case types.SET_REJECTED:
		return action.images
	case types.ADD_REJECTED:
		return [ ...state, action.images ]
	case types.REMOVE_REJECTED:
		return _.without( state, action.images )
	default:
		return state;

	}

}

const valid = ( state = [ ], action ) => {

	switch ( action.type ){

	case types.SET_VALID:
		return action.images
	case types.ADD_VALID:
		return [ ...state, action.images ]
	case types.REMOVE_VALID:
		return _.without( state, action.images )
	default:
		return state;

	}

}

const action = ( state = [ ], action ) => {

	switch ( action.type ){

	case types.SET_ACTION:
		return action.images
	case types.ADD_ACTION:
		return [ ...state, action.images ]
	case types.REMOVE_ACTION:
		return _.without( state, action.images )
	default:
		return state;

	}

}

const invalid = ( state = [ ], action ) => {

	switch ( action.type ){

	case types.SET_INVALID:
		return action.images
	case types.ADD_INVALID:
		return [ ...state, action.images ]
	case types.REMOVE_INVALID:
		return _.without( state, action.images )
	default:
		return state;

	}

}

/*const layers = ( state = { ready: true, form: false, screen: false, map: true }, action ) => {

	switch ( action.type ){

	case types.SET_VISIBILITY:
		return  _.extend( {}, state, action.options )
	default:
		return state;

	}

}*/


const coastwards = combineReducers( {

	browser,
	i18n,
	dialog,
	snackbar,
	rejected,
	valid,
	action, 
	invalid

} )

export default coastwards