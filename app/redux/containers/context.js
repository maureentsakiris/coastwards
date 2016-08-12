import { connect } from 'react-redux'

import DIV from 'components/tags/div'


const mapStateToProps = ( state ) => {

	return {

		lang: state.language.locale,
		dir: state.language.dir

	}

}


const context = connect(

	mapStateToProps,
	null

)( DIV )

export default context