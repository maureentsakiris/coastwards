import { connect } from 'react-redux'
import CONTEXT from 'components/context'
import { showDialog } from 'actions/ui/dialog'
import { unclipPage } from 'actions/main/main'


const mapStateToProps = ( state ) => {

	const { locale, dir } = state.i18n
	const { jazzSupported } = state.browser

	return {

		lang: locale,
		dir: dir,
		jazzSupported: jazzSupported,
		clipped: state.clipped,
		useraction: state.useraction

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		unclipPage: ( e ) => {

			e.preventDefault()
			dispatch( unclipPage( e ) )

		},
		showDialog: ( component, e ) => {

			e.preventDefault()
			dispatch( showDialog( component ) )

		}

	}

}


const context = connect(

	mapStateToProps,
	mapDispatchToProps

)( CONTEXT )

export default context