import * as types from 'types'
import { addSnackbarMessage } from 'actions/snackbar'
import _ from 'underscore'
import accepts from 'attr-accept'


function _promiseFilesSelected ( e ){

	return new Promise( ( resolve, reject ) => {

		const filesSelected = e.dataTransfer ? e.dataTransfer.files : e.currentTarget.files;

		if( filesSelected.length > 0 ){

			resolve( filesSelected );

		}else{

			reject( Error( 'actions.js/_promiseFilesSelected/filesSelected.length = 0' ) );

		}

	} );

}

function _promiseFilesAccepted ( filesSelected ){ //for images that have been dropped not selected

	return new Promise( ( resolve, reject ) => {

		let filesAccepted = []
		let filesRejected = []

		_.each( filesSelected, ( file ) => {

			if( accepts( file, 'image/*' ) ){ // --> upload.jsx

				file.preview = window.URL.createObjectURL( file )
				filesAccepted.push( file )

			}else{

				filesRejected.push( file )

			}

		} )


		if( !filesAccepted.length ){

			reject( 'warning_all_files_rejected' ) // --> snackbar.jsx

		}else{

			resolve( { filesAccepted, filesRejected } )

		}

	} )

}


function _promiseFilesValidated ( filesAccepted ){

	return new Promise( ( resolve, reject ) => {

		let imagesValid = filesAccepted
		let imagesInvalid = []

		if( !imagesValid.length ){

			reject( 'warning_all_files_invalid' ) // --> snackbar.jsx

		}else{
			
			resolve( { imagesValid, imagesInvalid } )

		}
	
	} )

}



export function validateFiles ( e ) {

	return function ( dispatch ) {

		_promiseFilesSelected( e )
		.then( _promiseFilesAccepted )
		.then( ( files ) => {

			dispatch( {

				type: types.SET_FILES,
				filesAccepted: files.filesAccepted,
				filesRejected: files.filesRejected

			} )

			if( files.filesRejected.length > 0 ){

				dispatch( addSnackbarMessage( 'warning_some_files_rejected' ) ) // --> snackbar.jsx

			}

			return files.filesAccepted

		} )
		.then( _promiseFilesValidated )
		.then( ( images ) => {

			dispatch( {

				type: types.SET_IMAGES,
				imagesValid: images.imagesValid,
				imagesInvalid: images.imagesInvalid

			} )

			return images.imagesValid

		} )
		.catch( ( error ) => {

			if( typeof error === 'string' ){

				dispatch( addSnackbarMessage( error ) )

			}else{

				console.error( "Untranslated error: ", error )

			}

		} )

	}

}