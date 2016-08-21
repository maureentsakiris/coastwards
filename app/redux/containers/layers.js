import { connect } from 'react-redux'
import { setVisibility } from 'actions/layers'

import LAYERS from 'components/layers'


const mapStateToProps = ( state ) => {

	const { ready, form, screen, map } = state.layers

	return {

		showReady: ready,
		showForm: form,
		showScreen: screen,
		showMap: map

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		setVisibility: ( options ) => {

			dispatch( setVisibility( options ) )

		}

	}

}


const layers = connect(

	mapStateToProps,
	mapDispatchToProps

)( LAYERS )

export default layers