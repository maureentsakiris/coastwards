import * as types from 'types'
import _ from 'underscore'

function setSnackbarMessages ( messages ) {

	return {

		type: types.SET_SNACKBAR_MESSAGES,
		messages: messages

	}

}

export function addSnackbarMessage ( message ){

	return function ( dispatch, getState ){

		const state = getState()
		const messages = state.snackbar.messages
		messages.push( message )

		dispatch( setSnackbarMessages( messages ) )

		setTimeout ( () => {

			const state = getState()
			const messages = state.snackbar.messages
			messages.shift()

			dispatch( setSnackbarMessages( messages ) )

		}, 5000 )

	}

}