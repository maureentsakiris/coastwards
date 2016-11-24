import { connect } from 'react-redux'

import { resetForm, scrollToMap } from 'actions/main'
import ERRORS from 'components/errors'


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
			dispatch( scrollToMap() )
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