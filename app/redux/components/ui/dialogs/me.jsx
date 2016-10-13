import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'


const messages = defineMessages( {

	me_header:{
		id: "me_header",
		description: "Header - Browser support",
		defaultMessage: "Maureen-Elenie Tsakiris"
	},
	me_text:{
		id: "me_text",
		description: "P - ",
		defaultMessage: "(I'm on it)"
	}

} )


const me = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<DIV>
			<H priority={ 2 }>{ formatMessage( messages.me_header ) }</H>
			<P>{ formatMessage( messages.me_text ) }</P>
		</DIV>

	)

}

me.propTypes = {

	intl: intlShape,
	component: PropTypes.node,
	active: PropTypes.bool,
	closeDialog: PropTypes.func

}

export default injectIntl ( me )
