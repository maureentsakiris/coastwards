import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'


const mapStateToProps = ( state ) => {

	const { locale, dir, messages } = state.i18n

	return {

		key: locale,
		dir: dir,
		locale: locale,
		messages: messages
		
	}

}

const i18nProvider = connect(

	mapStateToProps

)( IntlProvider )

export default i18nProvider