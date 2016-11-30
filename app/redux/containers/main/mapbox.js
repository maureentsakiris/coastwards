import { connect } from 'react-redux'
import { displayMap } from 'actions/main/mapbox'
import { disableAndreasPinch } from 'actions/main/main'
import MAPBOX from 'components/main/mapbox'


const mapDispatchToProps = ( dispatch ) => {

	return {

		displayMap: ( ) => {

			dispatch( displayMap() )

		},
		disableAndreasPinch: ( ) => {

			dispatch( disableAndreasPinch() )

		}

	}

}


const mapbox = connect(

	null,
	mapDispatchToProps

)( MAPBOX )

export default mapbox