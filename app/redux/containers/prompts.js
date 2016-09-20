import { connect } from 'react-redux'

import { resetForm } from 'actions/main'
import PROMPTS from 'components/prompts'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.prompts,
		prompt: state.prompt,
		mapboxSupported: state.browser.mapboxSupported

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		hide: ( ) => {

			dispatch( { type: 'SET_LAYER_VISIBILITY', layer: 'prompts', to: false } )

		},
		resetForm: ( ) => {

			dispatch( resetForm() )

		}

	}

}


const prompts = connect(

	mapStateToProps,
	mapDispatchToProps

)( PROMPTS )

export default prompts