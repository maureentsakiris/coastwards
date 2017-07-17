import { combineReducers } from 'redux'
import * as types from 'types-admin'
import { extend } from 'underscore'

import materials from 'config'

const form = ( state = { show: true, results: undefined, material: '%', materialverified: '%', verified: '0', id: '%', example:'%', intro:'%', closeup: '%', pointmanual: '%', pointcorrected: '%' }, action ) => {

	switch ( action.type ){

	case types.SET_FORM_VISIBILITY:
		return extend( {}, state, { show: action.to } )
	case types.SET_RESULTS:
		return extend( {}, state, { results: action.to } )
	case types.SET_MATERIAL:
		return extend( {}, state, { material: action.to } )
	case types.SET_MATERIAL_VERIFIED:
		return extend( {}, state, { materialverified: action.to } )
	case types.SET_VERIFIED:
		return extend( {}, state, { verified: action.to } )
	case types.SET_EXAMPLE:
		return extend( {}, state, { example: action.to } )
	case types.SET_INTRO:
		return extend( {}, state, { intro: action.to } )
	case types.SET_ID:
		return extend( {}, state, { id: action.to } )
	case types.SET_CLOSEUP:
		return extend( {}, state, { closeup: action.to } )
	case types.SET_POINTMANUAL:
		return extend( {}, state, { pointmanual: action.to } )
	case types.SET_POINTCORRECTED:
		return extend( {}, state, { pointcorrected: action.to } )
	default:
		return state

	}

} 

const mapbox = ( state = { map: undefined }, action ) => {

	switch ( action.type ){

	case types.SET_MAP:
		return extend( {}, state, { map: action.to } )
	default:
		return state

	}

}

const popup = ( state = { popup: undefined, feature: {} }, action ) => {

	switch ( action.type ){

	case types.SET_POPUP_INSTANCE:
		return extend( {}, state, { popup: action.to } )
	case types.SET_POPUP_FEATURE:
		return extend( {}, state, { feature: action.to } )
	default:
		return state

	}

}

const admin = combineReducers( {

	form,
	materials,
	mapbox,
	popup

} )

export default admin