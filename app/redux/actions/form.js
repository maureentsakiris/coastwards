import * as types from 'types'
import { addSnackbarMessage } from 'actions/snackbar'
import _ from 'underscore'
import { validateImage } from 'actions/validateImage'
import accepts from 'attr-accept'


function _promiseFilesSelected ( e ){

	return new Promise( ( resolve, reject ) => {

		const filesSelected = e.dataTransfer ? e.dataTransfer.files : e.currentTarget.files;

		if( filesSelected.length > 0 ){

			resolve( filesSelected );

		}else{

			reject( Error( 'actions/form.js/_promiseFilesSelected/filesSelected.length = 0' ) );

		}

	} );

}

function _promiseFilesAccepted ( filesSelected ){ //for images that have been dropped not selected

	return new Promise( ( resolve, reject ) => {

		let filesAccepted = []
		let filesRejected = []

		_.each( filesSelected, ( file ) => {

			if( accepts( file, 'image/*' ) ){ // --> upload.jsx

				filesAccepted.push( file )

			}else{

				file.status = 'rejected'
				filesRejected.push( file )

			}

		} )


		if( !filesAccepted.length ){

			reject( Error( 'warning_all_files_rejected' ) ) // --> error.js

		}else{

			resolve( { filesAccepted, filesRejected } )

		}

	} )

}

function _promiseFilesValidated ( filesAccepted ){

	return Promise.all( _.map( filesAccepted, ( image ) => { 

		return validateImage( image )

	} ) )

}


export function validateFiles ( e ) {

	return function ( dispatch ) {

		_promiseFilesSelected( e )
		.then( _promiseFilesAccepted )
		.then( ( files ) => {

			dispatch( {

				type: types.SET_REJECTED,
				images: files.filesRejected

			} )

			if( files.filesRejected.length > 0 ){

				dispatch( addSnackbarMessage( 'warning_some_files_rejected' ) ) // --> error.js
				
			}

			return files.filesAccepted

		} )
		.then( _promiseFilesValidated )
		.then( ( images ) => {

			//console.log( images )

			let valid = []
			let action = []
			let invalid = []

			_.each( images, ( image ) => {

				if( image.status === 'valid' ){

					valid.push( image )

				}else if( image.status === 'action' ){

					action.push( image )

				}else if( image.status === 'invalid' ){

					invalid.push( image )

				}

			} )

			dispatch( {

				type: types.SET_VALID,
				images: valid

			} )

			dispatch( {

				type: types.SET_ACTION,
				images: action

			} )

			dispatch( {

				type: types.SET_INVALID,
				images: invalid

			} )

			if( invalid.length > 0 ){

				dispatch( addSnackbarMessage( 'warning_some_images_invalid' ) ) // --> error.js
				
			}

			return images

		} )
		.catch( ( error ) => {

			dispatch( addSnackbarMessage( error ) )

		} )

	}

}
