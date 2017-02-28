import * as types from 'types-admin'
import { promiseXHR } from 'actions/util/request/xhr'


export const setMaterial = ( e ) => {

	return function ( dispatch ){

		dispatch( { type: types.SET_MATERIAL, to: e.currentTarget.value } )

	}

}

export const setMaterialVerified = ( e ) => {

	return function ( dispatch ){

		dispatch( { type: types.SET_MATERIAL_VERIFIED, to: e.currentTarget.value } )

	}

}

export const setVerified = ( e ) => {

	return function ( dispatch ){

		dispatch( { type: types.SET_VERIFIED, to: e.currentTarget.value } )

	}

}


export const fetch = ( ) => {

	return function ( dispatch, getState ){

		const state = getState()

		const { material, verified, materialverified } = state.form

		let formData = new FormData()
		formData.append( 'material', material )
		formData.append( 'verified', verified )
		formData.append( 'materialverified', materialverified )

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

		} )

	}

}

export const deleteContribution = ( contribution_id ) => {

	return function ( dispatch ){

		let formData = new FormData()
		formData.append( 'id', contribution_id )

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

				if( parsed.affectedRows == 1 ){

					dispatch( fetch() )

				}

			}

			return parsed

		} )
		.catch( ( error ) => {

			console.log( error )

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

			console.log( error )

		} )

	}

}