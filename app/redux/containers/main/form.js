import { connect } from 'react-redux'

import { setMaterial, /*setAdaptation,*/ setComment, setHashtag, uploadImage, resetMain } from 'actions/main/main'
import { showDialog } from 'actions/ui/dialog'
import FORM from 'components/main/form'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.form,
		image: state.form.image,
		jazzSupported: state.browser.jazzSupported

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		setMaterial: ( e ) => {

			dispatch( setMaterial( e ) )

		},
		/*setAdaptation: ( e ) => {

			dispatch( setAdaptation( e ) )

		},*/
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

		}

	}

}


const form = connect(

	mapStateToProps,
	mapDispatchToProps

)( FORM )

export default form