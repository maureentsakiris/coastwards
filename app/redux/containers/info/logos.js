import { connect } from 'react-redux'
import { showDialog } from 'actions/ui/dialog'
import LOGOS from 'components/info/logos'

const mapStateToProps = ( state ) => {

	const { jazzSupported } = state.browser

	return {

		jazzSupported: jazzSupported

	}

}

/*const mapDispatchToProps = ( dispatch ) => {

	return {

		showDialog: ( component, e ) => {

			e.preventDefault()
			dispatch( showDialog( component ) )

		}

	}

}*/


const logos = connect(

	mapStateToProps/*,
	mapDispatchToProps*/

)( LOGOS )

export default logos