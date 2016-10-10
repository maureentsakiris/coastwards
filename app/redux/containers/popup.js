import { connect } from 'react-redux'
import { hidePopup } from 'actions/mapbox'
import POPUP from 'components/popup'


const mapStateToProps = ( state ) => {

	return {

		feature: state.popup.feature

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		hidePopup: ( e ) => {

			e.preventDefault()
			dispatch( hidePopup() )

		}

	}

}


const popup = connect(

	mapStateToProps,
	mapDispatchToProps

)( POPUP )

export default popup