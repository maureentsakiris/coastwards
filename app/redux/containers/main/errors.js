import { connect } from 'react-redux'
import ERRORS from 'components/main/errors'


const mapStateToProps = ( state ) => {

	return {

		error: state.error,
		jazzSupported: state.browser.jazzSupported,
		show: state.layers.errors

	}

}

const mapDispatchToProps = ( ) => {

	return {

		

	}

}


const errors = connect(

	mapStateToProps,
	mapDispatchToProps

)( ERRORS )

export default errors