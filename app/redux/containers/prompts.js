import { connect } from 'react-redux'
import { resetForm, clipPage } from 'actions/main'
import PROMPTS from 'components/prompts'


const mapStateToProps = ( state ) => {

	return {

		prompt: state.prompt,
		jazzSupported: state.browser.jazzSupported,
		show: state.layers.prompts

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		hide: ( e ) => {

			e.preventDefault()
			dispatch( clipPage() )
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