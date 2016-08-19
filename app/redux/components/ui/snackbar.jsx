import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import _ from 'underscore'

const intlMessages = defineMessages( {

	warning_all_files_rejected:{
		id: "warning_all_files_rejected",
		description: "Warning - Warns the user that all files selected are the wrong file type",
		defaultMessage: "The files you selected are not images"
	},
	warning_some_files_rejected:{
		id: "warning_some_files_rejected",
		description: "Warning - Warns the user that some of the selected files have been rejected due to its file type",
		defaultMessage: "Some of the selected files are not the right file type and will be ignored"
	},
	warning_all_files_invalid:{
		id: "warning_all_files_invalid",
		description: "Warning - Warns the user that all files selected are invalid",
		defaultMessage: "Sorry, none of your images have passed the tests :/"
	}

} )

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

		return React.createElement( 'p', {

			key: index,
			children: formatMessage( intlMessages[ message ] )

		} )

	} )

}

snackbar.propTypes = {

	intl: intlShape,
	messages: PropTypes.array.isRequired

}

export default injectIntl ( snackbar )
