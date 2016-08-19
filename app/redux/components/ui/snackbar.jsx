import React, { PropTypes } from 'react'
import _ from 'underscore'

const snackbar = ( { messages } ) => {

	const msgs = _composeMessages( messages )

	return(

		<div>{ msgs }</div>

	)

}

const _composeMessages = ( messages ) => {

	return _.map( messages, ( message, index ) => {

		return React.createElement( 'p', {

			key: index,
			children: message

		} )

	} )

}

snackbar.propTypes = {

	messages: PropTypes.array.isRequired

}

export default snackbar