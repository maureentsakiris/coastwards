import { connect } from 'react-redux'

import { validateFile, setMaterial, uploadImage, locateCoast, resetForm } from 'actions/main'
import MAIN from 'components/main'


const mapStateToProps = ( state ) => {

	const { upload, prompts, statuses, errors, locate, geolocator, form } = state.layers

	return {

		uploadSupported: state.browser.uploadSupported,

		image: state.form.image,
		progress: state.form.progress,

		showUpload: upload,
		showPrompts: prompts,
		showStatuses: statuses,
		showErrors: errors,
		showLocate: locate,
		showGeolocator: geolocator,
		showForm: form

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		validateFile: ( e ) => {

			dispatch( validateFile( e ) )

		},
		setMaterial: ( e ) => {

			dispatch( setMaterial( e ) )

		},
		uploadImage: ( e ) => {

			dispatch( uploadImage( e ) )

		},
		locateCoast: ( e ) => {

			dispatch( locateCoast( e ) )

		},
		resetForm: ( ) => {

			dispatch( resetForm() )

		}

	}

}


const main = connect(

	mapStateToProps,
	mapDispatchToProps

)( MAIN )

export default main