import { connect } from 'react-redux'
import CONTEXTMAP from 'components/contextMap'

const mapStateToProps = ( state ) => {

	const { locale, dir } = state.i18n

	return {

		lang: locale,
		dir: dir,

	}

}


const contextMap = connect(

	mapStateToProps

)( CONTEXTMAP )

export default contextMap