import * as types from 'types'

export function showDialog ( title, message ){

	return {

		type: types.SHOW_DIALOG,
		title: title,
		message: message

	}

}

export function hideDialog ( ){

	return {

		type: types.HIDE_DIALOG

	}

}