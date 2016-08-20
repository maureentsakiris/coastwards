import { connect } from 'react-redux'

import { validateFiles } from 'actions/upload'
import UPLOAD from 'components/upload'


const mapStateToProps = ( state ) => {

	return {

		status: state.upload.status,
		filesAccepted: state.upload.filesAccepted,
		filesRejected: state.upload.filesRejected,
		imagesValid: state.upload.imagesValid,
		imagesInvalid: state.upload.imagesInvalid,
		mapboxSupported: state.upload.mapboxSupported

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		validateFiles: ( e ) => {

			dispatch( validateFiles( e ) )

		}

	}

}


const upload = connect(

	mapStateToProps,
	mapDispatchToProps

)( UPLOAD )

export default upload