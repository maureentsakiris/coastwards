import { connect } from 'react-redux'

import Snackbar from 'components/ui/snackbar'


const mapStateToProps = ( state ) => {

	return {

		messages: state.snackbar.messages

	}

}


const snackbar = connect(

	mapStateToProps

)( Snackbar )

export default snackbar