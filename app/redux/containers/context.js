import { connect } from 'react-redux'
import CONTEXT from 'components/context'
import { SET_INFOS_STATE } from 'types'
//import { scrollToDiv } from 'actions/ui/scroll'
import { unclipPage } from 'actions/main/main'


const mapStateToProps = ( state ) => {

	const { locale, dir } = state.i18n
	const { jazzSupported } = state.browser

	return {

		lang: locale,
		dir: dir,
		jazzSupported: jazzSupported,
		clipped: state.clipped,
		useraction: state.useraction,
		/*scrollY: state.scroll.y*/
		infosState: state.state.infos

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		unclipPage: ( e ) => {

			e.preventDefault()
			dispatch( unclipPage() )

		},
		setInfosState: ( bool, e ) => {

			e.preventDefault()
			//dispatch( scrollToDiv( 'Info' ) )
			dispatch( { type: SET_INFOS_STATE, to: bool } )

		}

	}

}


const context = connect(

	mapStateToProps,
	mapDispatchToProps

)( CONTEXT )

export default context