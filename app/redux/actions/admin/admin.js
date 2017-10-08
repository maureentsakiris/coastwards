import * as types from 'types-admin'
import { promiseXHR } from 'actions/util/request/xhr'
import { sendErrorMail } from 'actions/util/error/error'
import { setMapData } from 'actions/admin/mapbox'

export const setFilter = ( type, e ) => {

	const value = typeof( e ) === 'string' ? e : e.currentTarget.value

	return function ( dispatch ){

		dispatch( { type: types[ type ], to: value } )

		if( type != 'SET_DISPLAY' ){

			dispatch( fetch() )

		}
		
	}

}

export const fetch = ( ) => {

	return function ( dispatch, getState ){

		const state = getState()

		const { material, verified, materialverified, id, example, intro, closeup, pointmanual, pointcorrected } = state.form

		let formData = new FormData()
		formData.append( 'material', material )
		formData.append( 'verified', verified )
		formData.append( 'materialverified', materialverified )
		formData.append( 'id', id )
		formData.append( 'example', example )
		formData.append( 'intro', intro )
		formData.append( 'closeup', closeup )
		formData.append( 'pointmanual', pointmanual )
		formData.append( 'pointcorrected', pointcorrected )

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

					const features = parsed.json ? parsed.json.features : []
					
					dispatch( { type: types.SET_RESULTS, to: features } )
					dispatch( setMapData( parsed.json ) )

				}

				return parsed

			} )
			.catch( ( error ) => {

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

		/*promiseXHR( options )
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

			} )*/

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

		/*promiseXHR( options )
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

			} )*/

	}

}

export const _promiseRivagesCSV = ( e ) => {

	return new Promise( ( resolve, reject ) => {

		const files = e.dataTransfer ? e.dataTransfer.files : e.currentTarget.files

		if( files[ 0 ] ){

			resolve( files[ 0 ] )

		}else{

			reject( 'No CSV selected' )

		}

	} )

}

export const importRivagesCSV = ( e ) => {

	return function ( dispatch ){

		dispatch( { type: types.SET_SPINNER_VISIBILITY, to: true } )

		_promiseRivagesCSV( e )
			.then( ( csv ) => {

				let from = prompt( "Start from row:", "" )

				if( from == null ){

					throw Error( 'aborted' )

				}
		
				let formData = new FormData()
				formData.append( 'from', from )
				formData.append( 'csv', csv, 'rivages.csv' )

				let options = {

					data: formData,
					url: '/administrate/importRivagesCSV'

				}

				return options

			} )
			.then( promiseXHR )
			.then( JSON.parse )
			.then( ( parsed ) => {

				if( parsed.status == 'KO' ){

					throw Error( parsed.message )

				}else{

					console.log( parsed.array )
					dispatch( { type: types.SET_RIVAGES_RESULTS, to: parsed.array } )
					dispatch( resetImportRivagesCSV() )
					dispatch( fetch() )

				}
				return parsed

			} )
			.catch( ( error ) => {

				dispatch( resetImportRivagesCSV() )
				dispatch( sendErrorMail( error ) )

			} )

	}

}

export const resetImportRivagesCSV = () => {

	return function ( dispatch ){

		document.getElementById( 'Rivages' ).reset()
		dispatch( { type: types.SET_SPINNER_VISIBILITY, to: false } )

	}

}