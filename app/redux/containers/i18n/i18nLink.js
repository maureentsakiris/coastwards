import { connect } from 'react-redux'
import { loadLanguage } from 'actions'
import A from 'components/tags/a'


const mapStateToProps = ( state, ownProps ) => {

	const { locale } = ownProps

	return {

		active: locale === state.language.locale,
		hrefLang: locale

	}

}

const mapDispatchToProps = ( dispatch, ownProps ) => {

	return {

		onClick: () => {

			dispatch( loadLanguage( ownProps.locale ) )

		}

	}

}

const i18nLink = connect(

	mapStateToProps,
	mapDispatchToProps

)( A )

export default i18nLink