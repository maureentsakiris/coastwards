import { connect } from 'react-redux'
import { showDialog } from 'actions/ui/dialog'
import { addSnackbarMessage } from 'actions/ui/snackbar'

import TEAM from 'components/info/team'


const mapDispatchToProps = ( dispatch ) => {

	return {

		showDialog: ( component, e ) => {

			e.preventDefault()
			dispatch( showDialog( component ) )

		},
		addSnackbarMessage: ( msg, e ) => {

			e.preventDefault()
			dispatch( addSnackbarMessage( msg, 1500 ) )

		}

	}

}


const team = connect(

	null,
	mapDispatchToProps

)( TEAM )

export default team