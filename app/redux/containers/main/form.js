import { connect } from 'react-redux'
import { addSnackbarMessage } from 'actions/ui/snackbar'
import { setMaterial, uploadImage, resetMain } from 'actions/main/main'
import { showDialog } from 'actions/ui/dialog'
import FORM from 'components/main/form'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.form,
		image: state.form.image,
		jazzSupported: state.browser.jazzSupported,
		materials: state.materials

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		setMaterial: ( e ) => {

			dispatch( setMaterial( e ) )

		},
		uploadImage: ( e ) => {

			dispatch( uploadImage( e ) )

		},
		resetMain: ( ) => {

			dispatch( resetMain() )

		},
		showDialog: ( component, e ) => {

			e.preventDefault()
			dispatch( showDialog( component ) )

		},
		addSnackbarMessage: ( message ) => {

			dispatch( addSnackbarMessage( message ) )

		}

	}

}


const form = connect(

	mapStateToProps,
	mapDispatchToProps

)( FORM )

export default form