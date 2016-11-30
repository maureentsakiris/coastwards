import { connect } from 'react-redux'

import { resetForm } from 'actions/main/main'
import STATUSES from 'components/main/statuses'


const mapStateToProps = ( state ) => {

	return {

		status: state.status,
		progress: state.form.progress,
		show: state.layers.statuses

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		resetForm: ( ) => {

			dispatch( resetForm() )

		}

	}

}


const statuses = connect(

	mapStateToProps,
	mapDispatchToProps

)( STATUSES )

export default statuses