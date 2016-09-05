import { connect } from 'react-redux'
import { hideDialog } from 'actions/ui/dialog'
import DIALOG from 'components/ui/dialog'


const mapStateToProps = ( state ) => {

	const { title, message, active } = state.dialog

	return {

		title: title,
		message: message,
		active: active

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		closeDialog: ( ) => {

			dispatch( hideDialog() )

		}

	}

}


const dialog = connect(

	mapStateToProps,
	mapDispatchToProps

)( DIALOG )

export default dialog