import { connect } from 'react-redux'

import { setMaterial, uploadImage, resetMain } from 'actions/main'
import FORM from 'components/form'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.form,
		image: state.form.image

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

		}

	}

}


const form = connect(

	mapStateToProps,
	mapDispatchToProps

)( FORM )

export default form