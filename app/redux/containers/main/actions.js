import { connect } from 'react-redux'
import { showDialog } from 'actions/ui/dialog'
import { clipPage, openInput } from 'actions/main/main'
import ACTIONS from 'components/main/actions'


const mapStateToProps = ( state ) => {

	return {

		

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		hide: ( e ) => {

			e.preventDefault()
			dispatch( clipPage() )
			dispatch( { type: 'SET_LAYER_VISIBILITY', layer: 'prompts', to: false } )
			dispatch( { type: 'SET_USER_ACTION', to: 'browsing' } )

		},
		openInput: ( e ) => {

			e.preventDefault()
			dispatch( openInput( ) )

		},
		showDialog: ( component, e ) => {

			e.preventDefault()
			dispatch( showDialog( component ) )

		}

	}

}


const actions = connect(

	mapStateToProps,
	mapDispatchToProps

)( ACTIONS )

export default actions