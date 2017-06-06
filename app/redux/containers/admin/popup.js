import { connect } from 'react-redux'
import { hidePopup } from 'actions/admin/mapbox'
import { deleteContribution, updateContribution } from 'actions/admin/admin'
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

		},
		deleteContribution: ( id, uid, e ) => {

			e.preventDefault()
			
			if ( confirm( 'YOU COMPLETELY SURE YOU WANT TO DELETE THIS CONTRIBUTION?' ) ) {

				dispatch( deleteContribution( id, uid ) )

			} 

		},
		updateContribution: ( formID, e ) => {

			e.preventDefault()
			
			dispatch( updateContribution( formID ) )

		}

	}

}


const popup = connect(

	mapStateToProps,
	mapDispatchToProps

)( POPUP )

export default popup