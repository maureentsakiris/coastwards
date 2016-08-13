import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import DIV from 'components/tags/div'

const messages = defineMessages( {

	who_are_you:{
		id: "who_are_you",
		description: "Section Header. Who are you?",
		defaultMessage: "Who are you?"
	}

} )

const team = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<TOGGLE id="Team" priority={ 3 } text={ formatMessage( messages.who_are_you ) } >
			<DIV>Team portrait</DIV>
		</TOGGLE>

	)

}

team.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( team )