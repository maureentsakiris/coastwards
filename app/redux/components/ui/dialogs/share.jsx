import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'


const messages = defineMessages( {

	share_header:{
		id: "share_header",
		description: "Header - Why do you need my IP Address?",
		defaultMessage: "Tell a friend"
	},
	share_text:{
		id: "share_text",
		description: "P - ",
		defaultMessage: "(Sorry, not ready yet ... but you can still tell a friend!)"
	},
	ip_address_learn_more:{
		id: "ip_address_learn_more",
		description: "A - Learn more about IP Addresses",
		defaultMessage: "Read more about IP Addresses and the information they contain"
	},
	ip_address_learn_more_href:{
		id: "ip_address_learn_more_href",
		description: "HREF - ",
		defaultMessage: "https://en.wikipedia.org/wiki/IP_address"
	}

} )


const share = ( { intl, className } ) => {

	const { formatMessage } = intl

	return(

		<DIV className={ className } >
			<H priority={ 2 }>{ formatMessage( messages.share_header ) }</H>
			<P>{ formatMessage( messages.share_text ) }</P>
		</DIV>

	)

}

share.propTypes = {

	intl: intlShape,
	className: PropTypes.string

}

export default injectIntl ( share )
