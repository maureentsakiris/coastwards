import { connect } from 'react-redux'
import CONTEXT from 'components/context'
import { unclipPage } from 'actions/main/main'


const mapStateToProps = ( state ) => {

	const { locale, dir } = state.i18n
	const { jazzSupported } = state.browser

	return {

		lang: locale,
		dir: dir,
		jazzSupported: jazzSupported

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		unclipPage: ( e ) => {

			e.preventDefault()
			dispatch( unclipPage( e ) )

		}

	}

}


const context = connect(

	mapStateToProps,
	mapDispatchToProps

)( CONTEXT )

export default context