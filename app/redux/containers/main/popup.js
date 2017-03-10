import { connect } from 'react-redux'
import { hidePopup } from 'actions/main/mapbox'
import { showDialog } from 'actions/ui/dialog'
import POPUP from 'components/main/popup'


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

		},
		showDialog: ( component, e ) => {

			e.preventDefault()
			dispatch( showDialog( component ) )

		}

	}

}


const popup = connect(

	mapStateToProps,
	mapDispatchToProps

)( POPUP )

export default popup