import { connect } from 'react-redux'
import { setSnackbarMessage } from 'actions/ui/snackbar'
import { setMaterial, setComment, setHashtag, uploadImage, resetMain } from 'actions/main/main'
import { showDialog } from 'actions/ui/dialog'
import FORM from 'components/main/form'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.form,
		image: state.form.image,
		checkedValue: state.form.material,
		jazzSupported: state.browser.jazzSupported,
		materials: state.materials

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		setMaterial: ( e ) => {

			dispatch( setMaterial( e ) )

		},
		setComment: ( e ) => {

			dispatch( setComment( e ) )

		},
		setHashtag: ( e ) => {

			dispatch( setHashtag( e ) )

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
		setSnackbarMessage: ( message ) => {

			dispatch( setSnackbarMessage( message ) )

		}

	}

}


const form = connect(

	mapStateToProps,
	mapDispatchToProps

)( FORM )

export default form