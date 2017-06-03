import { combineReducers } from 'redux'
import * as types from 'types-admin'
import _ from 'underscore'

import materials from 'config'

const form = ( state = { show: true, results: undefined, material: '%', materialverified: '%', verified: '0', id: '%', example:'%', intro:'%', closeup: '%', pointmanual: '%', pointcorrected: '%' }, action ) => {

	switch ( action.type ){

	case types.SET_FORM_VISIBILITY:
		return _.extend( {}, state, { show: action.to } )
	case types.SET_RESULTS:
		return _.extend( {}, state, { results: action.to } )
	case types.SET_MATERIAL:
		return _.extend( {}, state, { material: action.to } )
	case types.SET_MATERIAL_VERIFIED:
		return _.extend( {}, state, { materialverified: action.to } )
	case types.SET_VERIFIED:
		return _.extend( {}, state, { verified: action.to } )
	case types.SET_EXAMPLE:
		return _.extend( {}, state, { example: action.to } )
	case types.SET_INTRO:
		return _.extend( {}, state, { intro: action.to } )
	case types.SET_ID:
		return _.extend( {}, state, { id: action.to } )
	case types.SET_CLOSEUP:
		return _.extend( {}, state, { closeup: action.to } )
	case types.SET_POINTMANUAL:
		return _.extend( {}, state, { pointmanual: action.to } )
	case types.SET_POINTCORRECTED:
		return _.extend( {}, state, { pointcorrected: action.to } )
	default:
		return state

	}

} 

const mapbox = ( state = { map: undefined }, action ) => {

	switch ( action.type ){

	case types.SET_MAP:
		return _.extend( {}, state, { map: action.to } )
	default:
		return state

	}

}

const popup = ( state = { popup: undefined, feature: {} }, action ) => {

	switch ( action.type ){

	case types.SET_POPUP_INSTANCE:
		return _.extend( {}, state, { popup: action.to } )
	case types.SET_POPUP_FEATURE:
		return _.extend( {}, state, { feature: action.to } )
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