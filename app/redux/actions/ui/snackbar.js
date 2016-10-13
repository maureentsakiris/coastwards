import * as types from 'types'

let timer

export function addSnackbarMessage ( message, timeout=6000 ){

	return function ( dispatch ){

		dispatch( {

			type: types.ADD_SNACKBAR_MESSAGE,
			message: message

		} )

		clearTimeout( timer )

		timer = setTimeout ( () => {

			dispatch( {

				type: types.REMOVE_SNACKBAR_MESSAGE,
				message: message
				
			} )

		}, timeout )

	}

}