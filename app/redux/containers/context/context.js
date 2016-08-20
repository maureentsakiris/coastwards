import { connect } from 'react-redux'

import DIV from 'components/tags/div'


const mapStateToProps = ( state ) => {

	const { locale, dir, messages } = state.i18n
	const mount = messages ? true : false

	return {

		lang: locale,
		dir: dir,
		mount: mount

	}

}


const context = connect(

	mapStateToProps,
	null

)( DIV )

export default context