import { connect } from 'react-redux'

import { resetForm, clipPage } from 'actions/main/main'
import ERRORS from 'components/main/errors'


const mapStateToProps = ( state ) => {

	return {

		error: state.error,
		jazzSupported: state.browser.jazzSupported,
		show: state.layers.errors

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		hide: ( e ) => {

			e.preventDefault()
			dispatch( clipPage() )
			dispatch( { type: 'SET_LAYER_VISIBILITY', layer: 'errors', to: false } )

		},
		resetForm: ( ) => {

			dispatch( resetForm() )

		}

	}

}


const errors = connect(

	mapStateToProps,
	mapDispatchToProps

)( ERRORS )

export default errors