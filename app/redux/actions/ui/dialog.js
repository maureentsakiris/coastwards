import * as types from 'types'

export function showDialog ( component ){

	document.body.style.overflow = 'hidden'
	return {

		type: types.SHOW_DIALOG,
		component: component

	}

}

export function hideDialog ( ){

	document.body.style.overflow = 'auto'
	return {

		type: types.HIDE_DIALOG

	}

}