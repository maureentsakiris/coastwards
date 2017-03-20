import { connect } from 'react-redux'

import MARKER from 'components/main/marker'

const mapStateToProps = ( state ) => {

	return {

		show: state.layers.marker,
		zoom: state.mapbox.zoom,
		image: state.form.image

	}

}

const marker = connect(

	mapStateToProps

)( MARKER )

export default marker