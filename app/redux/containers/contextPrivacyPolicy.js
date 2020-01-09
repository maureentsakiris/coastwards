import { connect } from 'react-redux'
import CONTEXTPRIVACYPOLICY from 'components/contextPrivacyPolicy'

const mapStateToProps = ( state ) => {

	const { locale, dir } = state.i18n

	return {

		lang: locale,
		dir: dir,

	}

}


const contextPrivacyPolicy = connect(

	mapStateToProps

)( CONTEXTPRIVACYPOLICY )

export default contextPrivacyPolicy