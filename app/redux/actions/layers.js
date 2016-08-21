import * as types from 'types'

export function setVisibility ( options ){

	return {

		type: types.SET_VISIBILITY,
		options: options

	}

}