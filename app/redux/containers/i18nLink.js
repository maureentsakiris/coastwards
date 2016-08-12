import { connect } from 'react-redux'
import { loadLanguage } from 'actions'
import A from 'components/tags/a'


const mapStateToProps = ( state, ownProps ) => {

	return {

		active: ownProps.locale === state.language.locale,
		hreflang: ownProps.locale

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