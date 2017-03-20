import { connect } from 'react-redux'
import CONTEXT from 'components/context'
import { SET_INFOS_STATE } from 'types'

const mapStateToProps = ( state ) => {

	const { locale, dir } = state.i18n
	const { jazzSupported } = state.browser

	return {

		lang: locale,
		dir: dir,
		jazzSupported: jazzSupported,
		clipped: state.clipped,
		infosState: state.state.infos

	}

}

const mapDispatchToProps = ( dispatch ) => {

	return {

		setInfosState: ( bool, e ) => {

			e.preventDefault()
			dispatch( { type: SET_INFOS_STATE, to: bool } )

		}

	}

}


const context = connect(

	mapStateToProps,
	mapDispatchToProps

)( CONTEXT )

export default context