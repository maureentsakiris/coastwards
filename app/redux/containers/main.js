import { connect } from 'react-redux'
import MAIN from 'components/main'
import { scrollUp } from 'actions/main'
import { setGeocoderPlaceholder } from 'actions/mapbox'


const mapStateToProps = ( state ) => {


	return {

		uploadSupported: state.browser.uploadSupported,
		jazzSupported: state.browser.jazzSupported

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		scrollUp: ( e ) => {

			e.preventDefault()
			dispatch( scrollUp() )

		},
		setGeocoderPlaceholder: ( placeholder ) => {

			dispatch( setGeocoderPlaceholder( placeholder ) )

		}

	}

}


const main = connect(

	mapStateToProps,
	mapDispatchToProps

)( MAIN )

export default main