import * as types from 'types'

import i18nLocales from 'i18n/i18nLocales'



export function loadLanguage ( locale ) {

	return function ( dispatch ) {

		i18nLocales.loadLocale( locale, ( error, i18nLocales ) => {

			if( error ){

				dispatch( {
					type: types.SHOW_DIALOG,
					message: error

				} )

			}else{

				dispatch( {
					type: types.LOAD_LANGUAGE,
					locale: i18nLocales.locale,
					dir: i18nLocales.dir,
					messages: i18nLocales.messages

				} )

			}

		} )

	}

}

function _promiseSelectedFiles ( e ){

	return new Promise( ( resolve, reject ) => {

		const selectedFiles = e.dataTransfer ? e.dataTransfer.files : e.currentTarget.files;

		if( selectedFiles.length > 0 ){

			resolve( selectedFiles );

		}else{

			reject( Error( 'DropzoneTB/_promiseSelectedFiles/selectedFiles.length = 0' ) );

		}

	} );

}

function _promiseAcceptedFiles ( selectedFiles ){

	//for images that have been dropped not selected

	return new Promise( ( resolve, reject ) => {

		resolve( selectedFiles )

	} )

}

export function startTests ( e ) {

	return function ( dispatch ) {

		_promiseSelectedFiles( e )
		.then( ( selectedFiles ) => {

			dispatch( {

				type: types.SET_STATUS,
				status: 'files_received'

			} )

			dispatch( {

				type: types.SET_SELECTED_FILES,
				selectedFiles: selectedFiles

			} )

			return selectedFiles

		} )
		.then( _promiseAcceptedFiles )
		.then( ( acceptedFiles ) => {

			dispatch( {

				type: types.SET_STATUS,
				status: 'files_accepted'

			} )

			return acceptedFiles

		} ) 
		.catch( ( error ) => {

			dispatch( {

				type: types.SET_STATUS,
				status: 'Error:' + error

			} )

		} )

	}

}

