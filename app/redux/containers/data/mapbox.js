import { connect } from 'react-redux'
import { displayMap } from 'actions/data/mapbox'
import MAPBOX from 'components/data/mapbox'

const mapStateToProps = ( state ) => {

	return {

		map: state.mapbox.map

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		displayMap: ( ) => {

			dispatch( displayMap() )

		}

	}

}


const mapbox = connect(

	mapStateToProps,
	mapDispatchToProps

)( MAPBOX )

export default mapbox