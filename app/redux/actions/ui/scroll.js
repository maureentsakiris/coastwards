import * as types from 'types'


export function setScrollY ( pos ){

	return {

		type: types.SET_SCROLL_Y,
		to: pos

	}

}