import React, { PropTypes } from 'react'
import { IntlProvider } from 'react-intl'


const i18n = ( { children, dir, locale, messages } ) => { 

	if( !messages ){

		return null

	}else{

		return (

			<IntlProvider dir={ dir } locale={ locale } messages={ messages } >{ children }</IntlProvider>

		)

	}

}

i18n.propTypes = {

	children: PropTypes.node,
	dir: PropTypes.string,
	locale: PropTypes.string,
	messages: PropTypes.object

}

export default i18n