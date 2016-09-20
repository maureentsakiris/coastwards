import { connect } from 'react-redux'

import { showDialog } from 'actions/ui/dialog'
import FORMDATA from 'components/formdata'


const mapStateToProps = ( state ) => {

	return {

		image: state.form.image,
		uid: state.form.uid,
		imageWidth: state.config.imageWidth

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		showDialog: ( title, message ) => {

			dispatch( showDialog( title, message ) )

		}

	}

}


const formdata = connect(

	mapStateToProps,
	mapDispatchToProps

)( FORMDATA )

export default formdata