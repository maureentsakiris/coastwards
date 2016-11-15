import { connect } from 'react-redux'

import { showGeolocator, resetMain } from 'actions/main'
import LOCATE from 'components/locate'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.locate

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		showGeolocator: ( e ) => {

			e.preventDefault()
			dispatch( showGeolocator( e ) )

		},
		resetMain: ( e ) => {

			e.preventDefault()
			dispatch( resetMain( false ) )

		}

	}

}


const locate = connect(

	mapStateToProps,
	mapDispatchToProps

)( LOCATE )

export default locate