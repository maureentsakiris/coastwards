import { connect } from 'react-redux'

import { acceptFiles } from 'actions/upload'
import UPLOAD from 'components/upload'


const mapStateToProps = ( state ) => {

	return {

		status: state.upload.status,
		filesAccepted: state.upload.filesAccepted,
		filesRejected: state.upload.filesRejected

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		acceptFiles: ( e ) => {

			dispatch( acceptFiles( e ) )

		}

	}

}


const upload = connect(

	mapStateToProps,
	mapDispatchToProps

)( UPLOAD )

export default upload