import { connect } from 'react-redux'
import { deleteContribution, updateContribution } from 'actions/admin/admin'
import FEATURE from 'components/admin/feature'


const mapStateToProps = ( state, ownprops ) => {

	return {

		properties: ownprops.properties,
		tabs: ownprops.tabs,
		materials: state.materials
		
	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

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


const feature = connect(

	mapStateToProps,
	mapDispatchToProps

)( FEATURE )

export default feature