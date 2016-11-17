import { connect } from 'react-redux'
import { hidePopup } from 'actions/mapbox'
import { addSnackbarMessage } from 'actions/ui/snackbar'
import POPUP from 'components/popup'


const mapStateToProps = ( state ) => {

	return {

		feature: state.popup.feature

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		hidePopup: ( ) => {

			dispatch( hidePopup() )

		},
		addSnackbarMessage: ( message, e ) => {

			e.preventDefault()
			dispatch( addSnackbarMessage( message, 1000 ) )

		}

	}

}


const popup = connect(

	mapStateToProps,
	mapDispatchToProps

)( POPUP )

export default popup