import { connect } from 'react-redux'

import SNACKBAR from 'components/ui/snackbar'


const mapStateToProps = ( state ) => {

	const { snackbar } = state

	return {

		messages: snackbar 

	}

}


const snackbar = connect(

	mapStateToProps

)( SNACKBAR )

export default snackbar