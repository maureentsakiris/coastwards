import { connect } from 'react-redux'
import { showDialog } from 'actions/ui/dialog'

import GUIDELINES from 'components/info/guidelines'

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


const guidelines = connect(

	mapStateToProps,
	mapDispatchToProps

)( GUIDELINES )

export default guidelines