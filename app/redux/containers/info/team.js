import { connect } from 'react-redux'
import { setSnackbarMessage } from 'actions/ui/snackbar'

import TEAM from 'components/info/team'


const mapDispatchToProps = ( dispatch ) => {

	return {

		setSnackbarMessage: ( msg, e ) => {

			e.preventDefault()
			dispatch( setSnackbarMessage( msg, 1500 ) )

		}

	}

}


const team = connect(

	null,
	mapDispatchToProps

)( TEAM )

export default team