import { connect } from 'react-redux'
import { showDialog } from 'actions/ui/dialog'
import CREDITS from 'components/main/credits'


const mapDispatchToProps = ( dispatch ) => {

	return {

		showDialog: ( component, e ) => {

			e.preventDefault()
			dispatch( showDialog( component ) )

		}

	}

}


const credits = connect(

	null,
	mapDispatchToProps

)( CREDITS )

export default credits