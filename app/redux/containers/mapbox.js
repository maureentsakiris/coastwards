import { connect } from 'react-redux'

//import { setMaterial, /*setAdaptation,*/ setComment, setHashtag, uploadImage, resetMain } from 'actions/main'
import MAPBOX from 'components/mapbox'


const mapStateToProps = ( state ) => {

	return {

		center: state.mapbox.center,
		zoom: state.mapbox.zoom

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {


	}

}


const mapbox = connect(

	mapStateToProps,
	mapDispatchToProps

)( MAPBOX )

export default mapbox