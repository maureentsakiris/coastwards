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

			reject( 'error_no_files_accepted' ) // --> upload.jsx

		}else{

			resolve( { filesAccepted, filesRejected } )

		}

	} )

}


/*function _promiseImagesValid ( filesAccepted ){

	return new Promise( ( resolve, reject ) => {


		//let testedImages = 


		let imagesValid = filesAccepted
		let imagesInvalid = []

		if( !imagesValid.length ){

			reject( 'error_no_images_valid' ) // --> upload.jsx

		}else{
			
			resolve( { imagesValid, imagesInvalid } )

		}
	
	} )

}*/



export function acceptFiles ( e ) {

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

				dispatch( addSnackbarMessage( '!someof the files are ignored because wrong filetype' ) )

				setTimeout ( () => {

					dispatch( addSnackbarMessage( '!someof other message' ) )

				}, 2000 )

			}

			dispatch( {

				type: types.SET_STATUS,
				status: 'validating_images' // --> upload.jsx

			} )

			return files.filesAccepted

		} )
		/*.then( _promiseImagesValid )
		.then( ( images ) => {

			dispatch( {

				type: types.SET_IMAGES,
				imagesValid: images.imagesValid,
				imagesInvalid: images.imagesInvalid

			} )

			return images.imagesValid

		} )*/
		.catch( ( error ) => {

			if( typeof error === 'string' ){

				dispatch( {

					type: types.SET_STATUS,
					status: error

				} )

			}else{

				console.error( "Untranslated error: ", error )

			}

		} )

	}

}