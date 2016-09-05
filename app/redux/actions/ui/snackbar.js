import * as types from 'types'

export function addSnackbarMessage ( message ){

	return function ( dispatch ){

		dispatch( {

			type: types.ADD_SNACKBAR_MESSAGE,
			message: message

		} )

		setTimeout ( () => {

			dispatch( {

				type: types.REMOVE_SNACKBAR_MESSAGE,
				message: message
				
			} )

		}, 6000 )

	}

}