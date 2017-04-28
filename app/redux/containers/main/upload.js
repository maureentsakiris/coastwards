import { connect } from 'react-redux'
import { validateFile, openInput, clipPage, resetMain } from 'actions/main/main'
import UPLOAD from 'components/main/upload'


const mapStateToProps = ( state ) => {

	return {

		jazzSupported: state.browser.jazzSupported,
		show: state.layers.upload,
		useraction: state.useraction

	}

}  

const mapDispatchToProps = ( dispatch ) => {

	return {

		validateFile: ( e ) => {

			dispatch( validateFile( e ) )

		},
		openInput: ( e ) => {

			e.preventDefault()
			dispatch( openInput( ) )

		},
		clipPage: ( ) => {

			dispatch( clipPage() )
			dispatch( { type: 'SET_LAYER_VISIBILITY', layer: 'prompts', to: false } )
			dispatch( { type: 'SET_LAYER_VISIBILITY', layer: 'errors', to: false } )
			dispatch( { type: 'SET_USER_ACTION', to: 'browsing' } )

		},
		resetMain: () => {

			dispatch( resetMain() )

		}

	}

}


const upload = connect(

	mapStateToProps,
	mapDispatchToProps

)( UPLOAD )

export default upload