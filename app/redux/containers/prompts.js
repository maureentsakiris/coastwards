import { connect } from 'react-redux'
import { showDialog } from 'actions/ui/dialog'
import { resetForm, openInput } from 'actions/main'
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
			dispatch( { type: 'SET_LAYER_VISIBILITY', layer: 'prompts', to: false } )

		},
		resetForm: ( ) => {

			dispatch( resetForm() )

		},
		showDialog: ( component, e ) => {

			e.preventDefault()
			dispatch( showDialog( component ) )

		},
		openInput: ( e ) => {

			e.preventDefault()
			dispatch( openInput( ) )

		}

	}

}


const prompts = connect(

	mapStateToProps,
	mapDispatchToProps

)( PROMPTS )

export default prompts