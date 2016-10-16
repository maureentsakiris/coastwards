import { connect } from 'react-redux'
import { displayMap } from 'actions/mapbox'
import MAPBOX from 'components/mapbox'


const mapDispatchToProps = ( dispatch ) => {

	return {

		displayMap: ( ) => {

			dispatch( displayMap() )

		}

	}

}


const mapbox = connect(

	null,
	mapDispatchToProps

)( MAPBOX )

export default mapbox