import * as types from 'types-data'
import { promiseXHR } from 'actions/util/request/xhr'
import { sendErrorMail } from 'actions/util/error/error'
import { setMapData } from 'actions/data/mapbox'

export const setFilter = ( type, e ) => {

	const value = typeof( e ) === 'string' ? e : e.currentTarget.value

	return function ( dispatch ){

		dispatch( { type: types[ type ], to: value } )
		dispatch( fetch() )

	}

}

export const fetch = ( ) => {

	return function ( dispatch, getState ){

		const state = getState()

		const { material, verified, materialverified, closeup, pointmanual, pointcorrected } = state.form

		let formData = new FormData()
		formData.append( 'material', material )
		formData.append( 'verified', verified )
		formData.append( 'materialverified', materialverified )
		formData.append( 'closeup', closeup )
		formData.append( 'pointmanual', pointmanual )
		formData.append( 'pointcorrected', pointcorrected )

		let options = {

			data: formData,
			url: '/data/fetch'

		}

		promiseXHR( options )
			.then( JSON.parse )
			.then( ( parsed ) => {

				if( parsed.status == 'KO' ){

					throw Error( parsed.message )

				}else{

					dispatch( { type: types.SET_RESULTS, to: parsed.json } )
					//dispatch( { type: types.SET_FORM_VISIBILITY, to: false } )
					dispatch( setMapData( parsed.json ) )

				}

				return parsed

			} )
			.catch( ( error ) => {

				dispatch( sendErrorMail( error ) )

			} )

	}

}

export const downloadCSV = ( ) => {

	return function ( dispatch, getState ){

		const state = getState()

		const { material, verified, materialverified, closeup, pointmanual, pointcorrected } = state.form

		//window.open( 'http://coastwards.org/data/csv?material=' + material + '&verified=' + verified + '&materialverified=' + materialverified + '&closeup=' + closeup + '&pointmanual=' + pointmanual + '&pointcorrected=' + pointcorrected )
		window.open( 'http://' + window.location.host + '/data/csv?material=' + material + '&verified=' + verified + '&materialverified=' + materialverified + '&closeup=' + closeup + '&pointmanual=' + pointmanual + '&pointcorrected=' + pointcorrected )

		/*let formData = new FormData()
		formData.append( 'material', material )
		formData.append( 'verified', verified )
		formData.append( 'materialverified', materialverified )
		formData.append( 'closeup', closeup )
		formData.append( 'pointmanual', pointmanual )
		formData.append( 'pointcorrected', pointcorrected )

		let options = {

			data: formData,
			url: '/data/csv',
			//responseType: 'document'
			//url: '/data/csv?material=' + material + '&verified=' + verified + '&materialverified=' + materialverified + '&closeup=' + closeup + '&pointmanual=' + pointmanual + '&pointcorrected=' + pointcorrected,
			//method: 'GET'

		}

		promiseXHR( options )
			.then( ( response ) => {

				console.log( response )

				return response

			} )
			.catch( ( error ) => {

				dispatch( sendErrorMail( error ) )

			} )*/

	}

}