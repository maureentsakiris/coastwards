import { connect } from 'react-redux'

import { validateFiles } from 'actions/form'
import FORM from 'components/form'


const mapStateToProps = ( state ) => {

	return {

		formData: state.browser.formData,
		rejected: state.rejected,
		valid: state.valid,
		action: state.action,
		invalid: state.invalid

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		validateFiles: ( e ) => {

			dispatch( validateFiles( e ) )

		}

	}

}


const form = connect(

	mapStateToProps,
	mapDispatchToProps

)( FORM )

export default form