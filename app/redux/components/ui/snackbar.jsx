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
		defaultMessage: "Found the location!! Here we go!"
	},
	zoom_until:{
		id: "zoom_until",
		description: "Snack - ",
		defaultMessage: "Zoom until the marker turns green and points to the location you took this picture!"
	},
	zoom_closer:{
		id: "zoom_closer",
		description: " - ",
		defaultMessage: "You gotta zoom until the marker turns green!"
	},
	two_fingers:{
		id: "two_fingers",
		description: "Snack - ",
		defaultMessage: "Use two fingers to zoom"
	},
	accept_terms_first:{
		id: "accept_terms_first",
		description: "Snack - ",
		defaultMessage: "You still have to accept the terms!"
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

			className: style.msg,
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
