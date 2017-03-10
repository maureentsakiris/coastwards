import * as types from 'types'

let timer

export const setSnackbarMessage = ( message, timeout=6000, yes, no ) => {

	return function ( dispatch ){

		dispatch( {

			type: types.SET_SNACKBAR_MESSAGE,
			message: message,
			timeout: timeout,
			yes: yes,
			no: no

		} )

		if( timer ){

			clearTimeout( timer )

		}

		if( timeout ){

			timer = setTimeout ( () => {

				dispatch( {

					type: types.REMOVE_SNACKBAR_MESSAGE
					
				} )

			}, timeout )

		}

	}

}

export const dismissSnackbar = () => {

	return function ( dispatch ){

		dispatch( {

			type: types.REMOVE_SNACKBAR_MESSAGE
			
		} )

	}

}