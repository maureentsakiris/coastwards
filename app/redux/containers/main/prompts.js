import { connect } from 'react-redux'
/*import { showDialog } from 'actions/ui/dialog'*/
import { resetForm, clipPage/*, openInput*/ } from 'actions/main/main'
import PROMPTS from 'components/main/prompts'


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

		}/*,
		openInput: ( e ) => {

			e.preventDefault()
			dispatch( openInput( ) )

		},
		showDialog: ( component, e ) => {

			e.preventDefault()
			dispatch( showDialog( component ) )

		}*/

	}

}


const prompts = connect(

	mapStateToProps,
	mapDispatchToProps

)( PROMPTS )

export default prompts