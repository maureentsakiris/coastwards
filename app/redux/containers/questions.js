import { connect } from 'react-redux'

import { showDialog } from 'actions/ui/dialog'
import QUESTIONS from 'components/questions'

const mapDispatchToProps = ( dispatch ) => {

	return {

		showDialog: ( title, message ) => {

			dispatch( showDialog( title, message ) )

		}

	}

}


const questions = connect(

	null,
	mapDispatchToProps

)( QUESTIONS )

export default questions