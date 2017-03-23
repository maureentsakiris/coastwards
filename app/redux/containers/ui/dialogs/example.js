import { connect } from 'react-redux'
import EXAMPLE from 'components/ui/dialogs/example'
import { fetchExamples } from 'actions/main/main'

const mapStateToProps = ( state ) => {

	return {

		jazzSupported: state.browser.jazzSupported,
		touchevents: state.browser.touchevents,
		examples: state.examples

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		fetchExamples: () => {

			dispatch( fetchExamples() )

		}

	}

}


const example = connect(

	mapStateToProps,
	mapDispatchToProps

)( EXAMPLE )

export default example