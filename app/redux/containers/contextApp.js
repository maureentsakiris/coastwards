import { connect } from 'react-redux'
import CONTEXTAPP from 'components/contextApp'

const mapStateToProps = ( state ) => {

	const { locale, dir } = state.i18n

	return {

		lang: locale,
		dir: dir,

	}

}


const contextApp = connect(

	mapStateToProps

)( CONTEXTAPP )

export default contextApp