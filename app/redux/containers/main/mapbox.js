import { connect } from 'react-redux'
import { displayMap } from 'actions/main/mapbox'
//import { disableAndreasPinch } from 'actions/main/main'
import MAPBOX from 'components/main/mapbox'

const mapStateToProps = ( state ) => {

	return {

		map: state.mapbox.map

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		displayMap: ( ) => {

			dispatch( displayMap() )

		}/*,
		disableAndreasPinch: ( ) => {

			dispatch( disableAndreasPinch() )

		}*/

	}

}


const mapbox = connect(

	mapStateToProps,
	mapDispatchToProps

)( MAPBOX )

export default mapbox