import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'


const messages = defineMessages( {

	whyhashtag_header:{
		id: "whyhashtag_header",
		description: "Header - ",
		defaultMessage: "Why add a hashtag?"
	},
	whyhashtag_text:{
		id: "whyhashtag_text",
		description: "P - ",
		defaultMessage: "Because then you can filter the images by this hashtag and find the ones you have uploaded faster!"
	}

} )


const whyhashtag = ( { intl, className } ) => {

	const { formatMessage } = intl

	return(

		<DIV className={ className } >
			<H priority={ 2 }>{ formatMessage( messages.whyhashtag_header ) }</H>
			<P>{ formatMessage( messages.whyhashtag_text ) }</P>
		</DIV>

	)

}

whyhashtag.propTypes = {

	intl: intlShape,
	className: PropTypes.string

}

export default injectIntl ( whyhashtag )
