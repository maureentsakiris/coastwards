import { connect } from 'react-redux'
import MAIN from 'components/main'
import { scrollUp } from 'actions/main'


const mapStateToProps = ( state ) => {


	return {

		uploadSupported: state.browser.uploadSupported,
		jazzSupported: state.browser.jazzSupported,
		marker: state.layers.marker

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		scrollUp: ( e ) => {

			e.preventDefault()
			dispatch( scrollUp() )

		}

	}

}


const main = connect(

	mapStateToProps,
	mapDispatchToProps

)( MAIN )

export default main