import { connect } from 'react-redux'
import ERRORS from 'components/main/errors'


const mapStateToProps = ( state ) => {

	return {

		jazzSupported: state.browser.jazzSupported,
		show: state.layers.errors,
		error: state.error,
		upload: state.layers.upload

	}

}

const errors = connect(

	mapStateToProps

)( ERRORS )

export default errors