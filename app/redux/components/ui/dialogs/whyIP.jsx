import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'
import A from 'components/tags/a'


const messages = defineMessages( {

	whyIP_header:{
		id: "whyIP_header",
		description: "Header - Why do you need my IP Address?",
		defaultMessage: "Why do you need my IP Address?"
	},
	whyIP_text:{
		id: "whyIP_text",
		description: "P - ",
		defaultMessage: "We need to be able to prove that we are not the source of the image. Basically, we are covering our own asses BUT we can only point to your IP Address, not to you."
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


const whyIP = ( { intl, className } ) => {

	const { formatMessage } = intl

	return(

		<DIV className={ className } >
			<H priority={ 2 }>{ formatMessage( messages.whyIP_header ) }</H>
			<P>{ formatMessage( messages.whyIP_text ) } <A target="_blank" href={ formatMessage( messages.ip_address_learn_more_href ) }>{ formatMessage( messages.ip_address_learn_more ) }</A></P>
		</DIV>

	)

}

whyIP.propTypes = {

	intl: intlShape,
	className: PropTypes.string

}

export default injectIntl ( whyIP )
