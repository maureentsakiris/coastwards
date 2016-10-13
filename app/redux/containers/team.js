import { connect } from 'react-redux'
import { showDialog } from 'actions/ui/dialog'
import { addSnackbarMessage } from 'actions/ui/snackbar'

import TEAM from 'components/team'



const mapStateToProps = ( state ) => {

	return {

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		showDialog: ( component, e ) => {

			e.preventDefault()
			dispatch( showDialog( component ) )

		},
		addSnackbarMessage: ( e ) => {

			e.preventDefault()
			dispatch( addSnackbarMessage( 'there_will_be_more', 1000 ) )

		}

	}

}


const team = connect(

	mapStateToProps,
	mapDispatchToProps

)( TEAM )

export default team