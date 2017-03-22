import { connect } from 'react-redux'
import { hideDialog } from 'actions/ui/dialog'
import DIALOG from 'components/ui/dialog'


const mapStateToProps = ( state ) => {

	const { component, active } = state.dialog

	return { 

		component: component,
		active: active

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		closeDialog: ( e ) => {

			e.preventDefault()
			dispatch( hideDialog() )

		}

	}

}


const dialog = connect(

	mapStateToProps,
	mapDispatchToProps

)( DIALOG )

export default dialog