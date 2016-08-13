import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'


const mapStateToProps = ( state ) => {

	return {

		key: state.language.locale,
		dir: state.language.dir,
		locale: state.language.locale,
		messages: state.language.messages
		
	}

}

const i18nProvider = connect(

	mapStateToProps

)( IntlProvider )

export default i18nProvider