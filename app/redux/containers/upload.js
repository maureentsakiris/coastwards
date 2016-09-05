import { connect } from 'react-redux'

import { validateFile } from 'actions/main'
import UPLOAD from 'components/upload'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.upload,
		showDropzone: state.browser.dndSupported,
		prompt: state.prompt

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		validateFile: ( e ) => {

			dispatch( validateFile( e ) )

		}

	}

}


const upload = connect(

	mapStateToProps,
	mapDispatchToProps

)( UPLOAD )

export default upload