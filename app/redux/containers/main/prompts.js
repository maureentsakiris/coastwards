import { connect } from 'react-redux'
import PROMPTS from 'components/main/prompts'

const mapStateToProps = ( state ) => {

	return {

		prompt: state.prompt,
		jazzSupported: state.browser.jazzSupported,
		show: state.layers.prompts

	}

}

const prompts = connect(

	mapStateToProps

)( PROMPTS )

export default prompts