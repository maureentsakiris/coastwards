import { connect } from 'react-redux'

import { showDialog } from 'actions/ui/dialog'
import QUESTIONS from 'components/questions'

const mapDispatchToProps = ( dispatch ) => {

	return {

		showDialog: ( component, e ) => {

			e.preventDefault()
			dispatch( showDialog( component ) )

		}

	}

}


const questions = connect(

	null,
	mapDispatchToProps

)( QUESTIONS )

export default questions