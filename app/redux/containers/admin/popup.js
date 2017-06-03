import { connect } from 'react-redux'
import { hidePopup } from 'actions/admin/mapbox'
import POPUP from 'components/admin/popup'


const mapStateToProps = ( state ) => {

	return {

		feature: state.popup.feature, 
		materials: state.materials
		
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