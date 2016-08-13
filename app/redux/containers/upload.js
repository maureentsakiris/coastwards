import { connect } from 'react-redux'
import { startTests } from 'actions'
import UPLOAD from 'components/upload'


const mapStateToProps = ( state ) => {

	return {

		status: state.upload.status

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		onChange: ( e ) => {

			dispatch( startTests( e ) )

		}

	}

}


const upload = connect(

	mapStateToProps,
	mapDispatchToProps

)( UPLOAD )

export default upload