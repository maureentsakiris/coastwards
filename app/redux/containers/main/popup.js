import { connect } from 'react-redux'
import { hidePopup } from 'actions/main/mapbox'
import { addSnackbarMessage } from 'actions/ui/snackbar'
import POPUP from 'components/main/popup'


const mapStateToProps = ( state ) => {

	return {

		feature: state.popup.feature

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		hidePopup: ( e ) => {

			e.preventDefault()
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