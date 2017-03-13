import { connect } from 'react-redux'
import { resetMain, setLocation } from 'actions/main/main'
import { setSnackbarMessage } from 'actions/ui/snackbar'
import MARKER from 'components/main/marker'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.marker,
		zoom: state.mapbox.zoom,
		image: state.form.image

	}

}

/*const mapDispatchToProps = ( dispatch ) => {

	return {

		resetMain: ( e ) => {

			e.preventDefault()
			dispatch( resetMain() )

		},
		setLocation: ( e ) => {

			e.preventDefault()
			dispatch( setLocation() )

		},
		setSnackbarMessage: ( msg, e ) => {

			e.preventDefault()
			dispatch( setSnackbarMessage( msg ) )

		}

	}

}*/


const marker = connect(

	mapStateToProps/*,
	mapDispatchToProps*/

)( MARKER )

export default marker