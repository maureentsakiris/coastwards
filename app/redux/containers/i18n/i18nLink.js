import { connect } from 'react-redux'
import { loadLanguage } from 'actions/i18n/i18n'
import { addSnackbarMessage } from 'actions/ui/snackbar'
import I18NLINK from 'components/i18n/i18nLink'


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

		onClick: ( e ) => {

			e.preventDefault()
			dispatch( loadLanguage( locale ) )
			dispatch( addSnackbarMessage( 'help_translate' ) )

		}

	}

}

const i18nLink = connect(

	mapStateToProps,
	mapDispatchToProps

)( I18NLINK )

export default i18nLink