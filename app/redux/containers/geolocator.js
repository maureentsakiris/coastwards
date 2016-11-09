import { connect } from 'react-redux'

import { resetMain, setLocation } from 'actions/main'
import GEOLOCATOR from 'components/geolocator'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.geolocator,
		zoom: state.mapbox.zoom,
		center: state.mapbox.center

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		resetMain: ( e ) => {

			e.preventDefault()
			dispatch( resetMain() )

		},
		setLocation: ( e ) => {

			e.preventDefault()
			dispatch( setLocation() )

		}

	}

}


const geolocator = connect(

	mapStateToProps,
	mapDispatchToProps

)( GEOLOCATOR )

export default geolocator