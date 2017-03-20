import { connect } from 'react-redux'

import STATUSES from 'components/main/statuses'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.statuses,
		jazzSupported: state.browser.jazzSupported,
		status: state.status,
		progress: state.form.progress

	}

}

const statuses = connect(

	mapStateToProps

)( STATUSES )

export default statuses