import * as types from 'types-admin'
import { promiseXHR } from 'actions/util/request/xhr'
import { sendErrorMail } from 'actions/util/error/error'


export const setMaterial = ( e ) => {

	const value = typeof( e ) === 'string' ? e : e.currentTarget.value

	return function ( dispatch ){

		dispatch( { type: types.SET_MATERIAL, to: value } )

	}

}

export const setMaterialVerified = ( e ) => {

	const value = typeof( e ) === 'string' ? e : e.currentTarget.value

	return function ( dispatch ){

		dispatch( { type: types.SET_MATERIAL_VERIFIED, to: value } )

	}

}

export const setVerified = ( e ) => {

	const value = typeof( e ) === 'string' ? e : e.currentTarget.value

	return function ( dispatch ){

		dispatch( { type: types.SET_VERIFIED, to: value } )

	}

}

export const setID = ( e ) => {

	return function ( dispatch ){

		dispatch( { type: types.SET_ID, to: e.currentTarget.value } )

	}

}

export const setExample = ( e ) => {

	const value = typeof( e ) === 'string' ? e : e.currentTarget.value

	return function ( dispatch ){

		dispatch( { type: types.SET_EXAMPLE, to: value } )

	}

}

export const setIntro = ( e ) => {

	const value = typeof( e ) === 'string' ? e : e.currentTarget.value

	return function ( dispatch ){

		dispatch( { type: types.SET_INTRO, to: value } )

	}

}

export const setCloseup = ( e ) => {

	const value = typeof( e ) === 'string' ? e : e.currentTarget.value

	return function ( dispatch ){

		dispatch( { type: types.SET_CLOSEUP, to: value } )

	}

}


export const fetch = ( ) => {

	return function ( dispatch, getState ){

		const state = getState()

		console.log( state )

		const { material, verified, materialverified, id, example, intro, closeup } = state.form

		let formData = new FormData()
		formData.append( 'material', material )
		formData.append( 'verified', verified )
		formData.append( 'materialverified', materialverified )
		formData.append( 'id', id )
		formData.append( 'example', example )
		formData.append( 'intro', intro )
		formData.append( 'closeup', closeup )

		let options = {

			data: formData,
			url: '/administrate/fetch'

		}

		promiseXHR( options )
		.then( JSON.parse )
		.then( ( parsed ) => {

			if( parsed.status == 'KO' ){

				throw Error( parsed.message )

			}else{

				dispatch( { type: types.SET_RESULTS, to: parsed.results } )

			}

			return parsed

		} )
		.catch( ( error ) => {

			console.log( error )
			dispatch( sendErrorMail( error ) )

		} )

	}

}

export const deleteContribution = ( contribution_id, contribution_uid ) => {

	return function ( dispatch ){

		let formData = new FormData()
		formData.append( 'id', contribution_id )
		formData.append( 'uid', contribution_uid )

		let options = {

			data: formData,
			url: '/administrate/delete'

		}

		promiseXHR( options )
		.then( JSON.parse )
		.then( ( parsed ) => {

			if( parsed.status == 'KO' ){

				throw Error( parsed.message )

			}else{

				dispatch( fetch() )

			}

			return parsed

		} )
		.catch( ( error ) => {

			dispatch( sendErrorMail( error ) )

		} )

	}

}

export const updateContribution = ( formID ) => {

	return function ( dispatch ){

		let form = document.getElementById( formID )
		let formData = new FormData( form )

		let options = {

			data: formData,
			url: '/administrate/update'

		}

		promiseXHR( options )
		.then( JSON.parse )
		.then( ( parsed ) => {

			if( parsed.status == 'KO' ){

				throw Error( parsed.message )

			}else{

				if( parsed.affectedRows == 1 ){

					dispatch( fetch() )

				}

			}

			return parsed

		} )
		.catch( ( error ) => {

			dispatch( sendErrorMail( error ) )

		} )

	}

}