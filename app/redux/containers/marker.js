import { connect } from 'react-redux'
import { toggleSatellite } from 'actions/mapbox'
import { resetMain, setLocation } from 'actions/main'
import { addSnackbarMessage } from 'actions/ui/snackbar'
import MARKER from 'components/marker'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.marker,
		zoom: state.mapbox.zoom,
		modus: state.mapbox.modus,
		image: state.form.image

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

		},
		addSnackbarMessage: ( msg, e ) => {

			e.preventDefault()
			dispatch( addSnackbarMessage( msg ) )

		}

	}

}


const marker = connect(

	mapStateToProps,
	mapDispatchToProps

)( MARKER )

export default marker