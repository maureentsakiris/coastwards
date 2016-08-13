import { connect } from 'react-redux'

import DIV from 'components/tags/div'


const mapStateToProps = ( state ) => {

	const mount = state.language.messages ? true : false

	return {

		lang: state.language.locale,
		dir: state.language.dir,
		mount: mount

	}

}


const context = connect(

	mapStateToProps,
	null

)( DIV )

export default context