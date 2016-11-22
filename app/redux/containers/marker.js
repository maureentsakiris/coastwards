import { connect } from 'react-redux'
import { toggleSatellite } from 'actions/mapbox'
import { resetMain, setLocation } from 'actions/main'
import MARKER from 'components/marker'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.marker,
		zoom: state.mapbox.zoom

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

		},
		toggleSatellite: ( e ) => {

			e.preventDefault()
			dispatch( toggleSatellite() )

		}

	}

}


const marker = connect(

	mapStateToProps,
	mapDispatchToProps

)( MARKER )

export default marker