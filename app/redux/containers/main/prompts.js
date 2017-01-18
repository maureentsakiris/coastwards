import { connect } from 'react-redux'
import PROMPTS from 'components/main/prompts'


const mapStateToProps = ( state ) => {

	return {

		prompt: state.prompt,
		jazzSupported: state.browser.jazzSupported,
		show: state.layers.prompts

	}

}

const mapDispatchToProps = ( ) => {

	return {


	}

}


const prompts = connect(

	mapStateToProps,
	mapDispatchToProps

)( PROMPTS )

export default prompts