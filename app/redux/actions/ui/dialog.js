import * as types from 'types'

export function showDialog ( component ){

	return {

		type: types.SHOW_DIALOG,
		component: component

	}

}

export function hideDialog ( ){

	return {

		type: types.HIDE_DIALOG

	}

}