import { connect } from 'react-redux'
import MAIN from 'components/main'
import { scrollUp } from 'actions/main'


const mapStateToProps = ( state ) => {


	return {

		uploadSupported: state.browser.uploadSupported,
		jazzSupported: state.browser.jazzSupported

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		scrollUp: ( ) => {

			dispatch( scrollUp() )

		}

	}

}


const main = connect(

	mapStateToProps,
	mapDispatchToProps

)( MAIN )

export default main