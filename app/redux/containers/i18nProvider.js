import { connect } from 'react-redux'
import { IntlProvider } from 'react-intl'


const mapStateToProps = ( state ) => {

	console.log( "Inside intl provider: ", state.language )

	return {

		locale: state.language.locale,
		messages: state.language.messages

	}

}

const i18nProvider = connect(

	mapStateToProps,
	null

)( IntlProvider )

export default i18nProvider