import { connect } from 'react-redux'
import I18N from 'components/i18n/i18n'


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

)( I18N )

export default i18nProvider