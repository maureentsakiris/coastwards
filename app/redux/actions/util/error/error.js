import { promiseXHR } from 'actions/util/request/xhr'

export const sendErrorMail = ( error ) => {

	return function () {

		let formData = new FormData()
		formData.append( 'error', error.stack )

		let options = { 

			url: '/contact/error',
			data: formData

		}

		promiseXHR( options )

	}

}