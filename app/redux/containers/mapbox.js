import { connect } from 'react-redux'
import { displayMap } from 'actions/mapbox'
import { disableAndreasPinch } from 'actions/main'
import MAPBOX from 'components/mapbox'


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