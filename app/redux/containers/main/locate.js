import { connect } from 'react-redux'

import { showMarker, resetMain } from 'actions/main/main'
import LOCATE from 'components/main/locate'


const mapStateToProps = ( state ) => {

	return {

		show: state.layers.locate

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		showMarker: ( e ) => {

			e.preventDefault()
			dispatch( showMarker( e ) )

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