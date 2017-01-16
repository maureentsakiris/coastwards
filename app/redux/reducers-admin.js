import { combineReducers } from 'redux'
import * as types from 'types-admin'
import _ from 'underscore'

import materials from 'config'

const form = ( state = { results: [], material: '%', verified: 0 }, action ) => {

	switch ( action.type ){

	case types.SET_RESULTS:
		return _.extend( {}, state, { results: action.to } )
	case types.SET_MATERIAL:
		return _.extend( {}, state, { material: action.to } )
	case types.SET_VERIFIED:
		return _.extend( {}, state, { verified: action.to } )
	default:
		return state

	}

} 


const admin = combineReducers( {

	form,
	materials

} )

export default admin