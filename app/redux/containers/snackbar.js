import { connect } from 'react-redux'

import SNACKBAR from 'components/ui/snackbar'


const mapStateToProps = ( state ) => {

	return {

		messages: state.snackbar 

	}

}


const snackbar = connect(

	mapStateToProps

)( SNACKBAR )

export default snackbar