import { connect } from 'react-redux'

import { validateFile } from 'actions/main'
import { setLayerVisibility } from 'actions/layers'
import UPLOAD from 'components/upload'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.upload,
		jazzSupported: state.browser.jazzSupported,
		prompt: state.prompt

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		validateFile: ( e ) => {

			dispatch( validateFile( e ) )

		},
		setLayerVisibility: ( options ) => {

			dispatch( setLayerVisibility( options ) )

		}

	}

}


const upload = connect(

	mapStateToProps,
	mapDispatchToProps

)( UPLOAD )

export default upload