import { connect } from 'react-redux'
import CONTEXT from 'components/context'


const mapStateToProps = ( state ) => {

	const { locale, dir } = state.i18n
	const { jazzSupported } = state.browser

	return {

		lang: locale,
		dir: dir,
		jazzSupported: jazzSupported

	}

}


const context = connect(

	mapStateToProps,
	null

)( CONTEXT )

export default context