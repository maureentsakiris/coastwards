import { connect } from 'react-redux'
import CONTEXT from 'components/context'
//import { scrollToId } from 'actions/context'
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
		scrollToMap:( e ) => {

			e.preventDefault()
			let div = document.getElementById( 'Main' )
			div.scrollIntoView( { behavior: 'smooth' } )

		}

	}

}


const context = connect(

	mapStateToProps,
	mapDispatchToProps

)( CONTEXT )

export default context