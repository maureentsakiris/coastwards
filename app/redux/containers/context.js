import { connect } from 'react-redux'
import CONTEXT from 'components/context'
import { scrollToId } from 'actions/context'
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
		scrollToId:( id, e ) => {

			dispatch( scrollToId( id, e ) )

		}

	}

}


const context = connect(

	mapStateToProps,
	mapDispatchToProps

)( CONTEXT )

export default context