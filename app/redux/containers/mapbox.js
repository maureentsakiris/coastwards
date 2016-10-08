import { connect } from 'react-redux'
import { displayMap } from 'actions/mapbox'
import MAPBOX from 'components/mapbox'


const mapStateToProps = ( state ) => {

	return {


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