import { connect } from 'react-redux'
import { deleteContribution, updateContribution } from 'actions/admin/admin'

import CONTRIBUTION from 'components/admin/contribution'


const mapStateToProps = ( state, ownProps ) => {

	return {

		materials: state.materials,
		result: ownProps.result

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


const contribution = connect(

	mapStateToProps,
	mapDispatchToProps

)( CONTRIBUTION )

export default contribution