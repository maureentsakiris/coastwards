import { connect } from 'react-redux'

import { validateFile, setMaterial, uploadImage } from 'actions/form'
import FORM from 'components/form'


const mapStateToProps = ( state ) => {

	return {

		uploadSupported: state.browser.uploadSupported,
		status: state.form.status,
		image: state.form.image,
		progress: state.form.progress

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

		}

	}

}


const form = connect(

	mapStateToProps,
	mapDispatchToProps

)( FORM )

export default form