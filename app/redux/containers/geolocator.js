import { connect } from 'react-redux'

import { resetMain } from 'actions/main'
import GEOLOCATOR from 'components/geolocator'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.geolocator

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		resetMain: ( e ) => {

			e.preventDefault()
			dispatch( resetMain() )

		}

	}

}


const geolocator = connect(

	mapStateToProps,
	mapDispatchToProps

)( GEOLOCATOR )

export default geolocator