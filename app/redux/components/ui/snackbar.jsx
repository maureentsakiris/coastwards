import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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
	},
	help_translate:{
		id: "help_translate",
		description: "Snack - ",
		defaultMessage: "Ya so, we haven't even started translating yet ... but that's the idea!"
	},
	oops:{
		id: "oops",
		description: "Snack - ",
		defaultMessage: "This will work at some point..."
	},
	there_will_be_more:{
		id: "there_will_be_more",
		description: " - ",
		defaultMessage: "There will be more .. and more official"
	}

} )

const snackbar = ( { intl, messages } ) => {

	const msgs = _composeMessages( intl, messages )

	return(

		<ReactCSSTransitionGroup 

			component="div"
			className={ style.snackbar }
			transitionAppear={true} 
			transitionName={ {

				enter: style.enter,
				enterActive: style.enterActive,
				leave: style.leave,
				leaveActive: style.leaveActive,
				appear: style.enter,
				appearActive: style.enterActive

			} }
			transitionEnterTimeout={ 300 }
			transitionLeaveTimeout={ 300 }
			transitionAppearTimeout={ 300 }

		>
			{ msgs }
		</ReactCSSTransitionGroup>

	)

} 

const _composeMessages = ( intl, messages ) => {

	const { formatMessage } = intl

	const msgs = messages.slice( -1 )

	return _.map( msgs, ( message, index ) => {

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
