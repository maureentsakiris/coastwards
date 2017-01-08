import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'


const messages = defineMessages( {

	share_header:{
		id: "share_header",
		description: "Header",
		defaultMessage: "Tell a friend"
	},
	share_text_intro:{
		id: "share_text_intro",
		description: "P - ",
		defaultMessage: "(Sorry, not ready yet ... but you can still tell a friend!)"
	}

} )


const share = ( { intl, className } ) => {

	const { formatMessage } = intl

	return(

		<DIV className={ className } >
			<H priority={ 2 }>{ formatMessage( messages.share_header ) }</H>
			<P>{ formatMessage( messages.share_text_intro ) }</P>
		</DIV>

	)

}

share.propTypes = {

	intl: intlShape,
	className: PropTypes.string

}

export default injectIntl ( share )
