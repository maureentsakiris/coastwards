import { connect } from 'react-redux'
import CONTEXT from 'components/context'
//import { scrollToMap } from 'actions/context'
import { unclipPage, scrollToMap } from 'actions/main/main'


const mapStateToProps = ( state ) => {

	const { locale, dir } = state.i18n
	const { jazzSupported } = state.browser

	return {

		lang: locale,
		dir: dir,
		jazzSupported: jazzSupported,
		clipped: state.clipped,
		useraction: state.useraction,
		scrollY: state.scroll.y

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		unclipPage: ( e ) => {

			e.preventDefault()
			dispatch( unclipPage() )

		},
		scrollToMap: ( ) => {

			dispatch( scrollToMap( ) )

		}

	}

}


const context = connect(

	mapStateToProps,
	mapDispatchToProps

)( CONTEXT )

export default context