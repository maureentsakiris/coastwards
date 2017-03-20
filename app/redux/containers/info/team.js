import { connect } from 'react-redux'
import { showDialog } from 'actions/ui/dialog'

import TEAM from 'components/info/team'

const mapStateToProps = ( state ) => {

	const { jazzSupported } = state.browser

	return {

		jazzSupported: jazzSupported

	}

}


const mapDispatchToProps = ( dispatch ) => {

	return {

		showDialog: ( component, e ) => {

			e.preventDefault()
			dispatch( showDialog( component ) )

		}

	}

}


const team = connect(

	mapStateToProps,
	mapDispatchToProps

)( TEAM )

export default team