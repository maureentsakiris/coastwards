import { connect } from 'react-redux'

import { showDialog } from 'actions/ui/dialog'
import LOGOS from 'components/info/logos'

const mapDispatchToProps = ( dispatch ) => {

	return {

		showDialog: ( component, e ) => {

			e.preventDefault()
			dispatch( showDialog( component ) )

		}

	}

}


const logos = connect(

	null,
	mapDispatchToProps

)( LOGOS )

export default logos