import { connect } from 'react-redux'

import { resetMain, showMarker } from 'actions/main'
import GEOLOCATOR from 'components/geolocator'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.geolocator

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		resetMain: ( e ) => {

			e.preventDefault()
			dispatch( resetMain() )

		},
		showMarker: ( e ) => {

			e.preventDefault()
			dispatch( showMarker() )

		}

	}

}


const geolocator = connect(

	mapStateToProps,
	mapDispatchToProps

)( GEOLOCATOR )

export default geolocator