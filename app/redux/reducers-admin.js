import { combineReducers } from 'redux'
import * as types from 'types-admin'
import _ from 'underscore'


const form = ( state = { results: [], material: '' }, action ) => {

	switch ( action.type ){

	case types.SET_RESULTS:
		return _.extend( {}, state, { results: action.to } )
	case types.SET_MATERIAL:
		return _.extend( {}, state, { material: action.to } )
	default:
		return state

	}

} 


const admin = combineReducers( {

	form

} )

export default admin