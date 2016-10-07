import { connect } from 'react-redux'

import { resetForm } from 'actions/main'
import ERRORS from 'components/errors'


const mapStateToProps = ( state ) => {

	return {

		error: state.error,
		show: state.layers.errors,
		jazzSupported: state.browser.jazzSupported

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		hide: ( ) => {

			dispatch( { type: 'SET_LAYER_VISIBILITY', layer: 'errors', to: false } )
			dispatch( { type: 'SET_LAYER_VISIBILITY', layer: 'upload', to: true } )

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