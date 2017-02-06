import { connect } from 'react-redux'
/*import { hidePopup } from 'actions/main/mapbox'
import { showDialog } from 'actions/ui/dialog'*/
/*import { addSnackbarMessage } from 'actions/ui/snackbar'*/
import REPORT from 'components/ui/dialogs/report'


const mapStateToProps = ( state ) => {

	return {

		feature: state.popup.feature

	}

}

/*const mapDispatchToProps = ( dispatch ) => {

	return {

		hidePopup: ( e ) => {

			e.preventDefault()
			dispatch( hidePopup() )

		},
		addSnackbarMessage: ( message, e ) => {

			e.preventDefault()
			dispatch( addSnackbarMessage( message, 1000 ) )

		},
		showDialog: ( component, e ) => {

			e.preventDefault()
			dispatch( showDialog( component ) )

		}

	}

}*/


const report = connect(

	mapStateToProps

)( REPORT )

export default report