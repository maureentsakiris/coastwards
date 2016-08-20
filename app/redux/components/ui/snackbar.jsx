import React, { PropTypes } from 'react'
import { injectIntl, intlShape } from 'react-intl'
import _ from 'underscore'

import { errorTranslations } from 'messages/error'
const translations = _.extend( errorTranslations )

const snackbar = ( { intl, messages } ) => {

	if( !messages.length ){

		return null

	}else{

		const msgs = _composeMessages( intl, messages )
		const style = {

			position: 'fixed',
			width: '100%',
			textAlign: 'center',
			bottom: '0',
			backgroundColor: '#000',
			color: '#fff'

		}

		return(

			<div style={ style } >{ msgs }</div>

		)

	}

} 

const _composeMessages = ( intl, messages ) => {

	const { formatMessage } = intl

	return _.map( messages, ( message, index ) => {

		const m = translations[ message ] ? formatMessage( translations[ message ] ) : message

		return React.createElement( 'p', {

			key: index,
			children: m

		} )

	} )

}

snackbar.propTypes = {

	intl: intlShape,
	messages: PropTypes.array.isRequired

}

export default injectIntl ( snackbar )
