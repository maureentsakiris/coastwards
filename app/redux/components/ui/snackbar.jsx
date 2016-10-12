import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'
import _ from 'underscore'

import P from 'components/tags/p'

import style from './_snackbar'


const intlMessages = defineMessages( {

	selected_truncated:{
		id: "selected_truncated",
		description: "Warning - Informs the user that more than one file have been dropped but we can only process one at a time",
		defaultMessage: "Sorry, at the moment we can only process one image at a time!"
	},
	here_we_go:{
		id: "here_we_go",
		description: "Snack - ",
		defaultMessage: "Awesome!! Here we go!"
	}

} )

const snackbar = ( { intl, messages } ) => {

	
	const msgs = _composeMessages( intl, messages )

	const cls = Classnames( style.snackbar, {

		[ style.show ]: messages.length > 0

	} )

	return(

		<div className={ cls } >
			<div>{ msgs }</div>
		</div>

	)

} 

const _composeMessages = ( intl, messages ) => {

	const { formatMessage } = intl

	return _.map( messages, ( message, index ) => {

		const mess = typeof message === 'object' ? message.message : message //if error object
		const m = intlMessages[ mess ] ? formatMessage( intlMessages[ mess ] ) : mess //if translation 

		return React.createElement( P, {

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
