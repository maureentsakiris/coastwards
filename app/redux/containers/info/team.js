import { connect } from 'react-redux'
import { setSnackbarMessage } from 'actions/ui/snackbar'
import { showDialog } from 'actions/ui/dialog'

import TEAM from 'components/info/team'

const mapStateToProps = ( state ) => {

	const { jazzSupported } = state.browser

	return {

		jazzSupported: jazzSupported

	}

}


const mapDispatchToProps = ( dispatch ) => {

	return {

		setSnackbarMessage: ( msg, e ) => {

			e.preventDefault()
			dispatch( setSnackbarMessage( msg, 1500 ) )

		},
		showDialog: ( component, e ) => {

			e.preventDefault()
			dispatch( showDialog( component ) )

		}

	}

}


const team = connect(

	mapStateToProps,
	mapDispatchToProps

)( TEAM )

export default team