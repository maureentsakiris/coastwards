import { combineReducers } from 'redux'
import * as types from 'types-admin'
import _ from 'underscore'

import materials from 'config'

const form = ( state = { results: [], material: '%', materialverified: '%', verified: '%', id: '%', example:'%' }, action ) => {

	switch ( action.type ){

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
	case types.SET_ID:
		return _.extend( {}, state, { id: action.to } )
	default:
		return state

	}

} 


const admin = combineReducers( {

	form,
	materials

} )

export default admin