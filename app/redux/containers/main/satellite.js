import { connect } from 'react-redux'
import { toggleSatellite } from 'actions/main/mapbox'
import SATELLITE from 'components/main/satellite'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.satellite,
		modus: state.mapbox.modus

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		toggleSatellite: ( e ) => {

			e.preventDefault()
			dispatch( toggleSatellite() )

		},

	}

}


const satellite = connect(

	mapStateToProps,
	mapDispatchToProps

)( SATELLITE )

export default satellite