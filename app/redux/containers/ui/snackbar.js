import { connect } from 'react-redux'
import { dismissSnackbar } from 'actions/ui/snackbar'
import SNACKBAR from 'components/ui/snackbar'


const mapStateToProps = ( state ) => {

	const { snackbar, browser } = state

	return {

		jazzSupported: browser.jazzSupported,
		message: snackbar.message,
		yes: snackbar.yes,
		no: snackbar.no

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		dismissSnackbar: ( func, e ) => {

			e.preventDefault()
			dispatch( dismissSnackbar() )
			if( func ){

				dispatch( func )

			}

		}

	}

}

const snackbar = connect(

	mapStateToProps,
	mapDispatchToProps

)( SNACKBAR )

export default snackbar