import { connect } from 'react-redux'
import { loadLanguage } from 'actions/i18n/i18n'
import A from 'components/tags/a'


const mapStateToProps = ( state, ownProps ) => {

	const { locale } = ownProps

	return {

		active: locale === state.i18n.locale,
		hrefLang: locale

	}

}

const mapDispatchToProps = ( dispatch, ownProps ) => {

	const { locale } = ownProps

	return {

		onClick: () => {

			dispatch( loadLanguage( locale ) )

		}

	}

}

const i18nLink = connect(

	mapStateToProps,
	mapDispatchToProps

)( A )

export default i18nLink