import * as types from 'types-admin'
import { promiseXHR } from 'actions/util/request/xhr'
import { sendErrorMail } from 'actions/util/error/error'
import { setMapData } from 'actions/admin/mapbox'
import parse from 'csv-parse'

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

					dispatch( { type: types.SET_RESULTS, to: parsed.json } )
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

export const _promiseRivagesCSV = ( e ) => {

	return new Promise( ( resolve, reject ) => {

		let from = prompt( "Start from row:", "" )
		//let to = prompt( "End at row:", "" )

		const reader = new FileReader()
		reader.onload = ( ) => {

			console.log( "loaded csv" )

			let csv = reader.result
			parse( csv, { columns: true, from: from }, ( error, output ) => {

				if( error ){

					reject( error )

				}else{

					//console.log( output )
					resolve( output )

				}

			} )

		}

		reader.onerror = ( error ) => {

			reject( error )

		}

		reader.readAsText( e.currentTarget.files[ 0 ] )

	} )

}

export const _promiseImport = ( output ) => {

	return new Promise( ( resolve, reject ) => {

		let formData = new FormData()
		formData.append( 'csv', JSON.stringify( output ) )

		let options = {

			data: formData,
			url: '/administrate/importRivagesCSV'

		}

		promiseXHR( options )
			.then( JSON.parse )
			.then( ( parsed ) => {

				if( parsed.status == 'KO' ){

					throw Error( parsed.message )

				}else{

					resolve( parsed )

				}

				return parsed

			} )
			.catch( ( error ) => {

				reject( error )

			} )

	} )

}

export const importRivagesCSV = ( e ) => {

	return function ( dispatch ){

		dispatch( { type: types.SET_SPINNER_VISIBILITY, to: true } )

		_promiseRivagesCSV( e )
			.then( _promiseImport )
			.then( ( parsed ) => {

				if( parsed.status == 'KO' ){

					throw Error( parsed.message )

				}else{

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