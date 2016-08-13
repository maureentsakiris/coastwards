import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import DIV from 'components/tags/div'

const messages = defineMessages( {

	any_picture:{
		id: "any_picture",
		description: "Section Header. Just any picture?",
		defaultMessage: "Just any picture?"
	}

} )

const guidelines = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<TOGGLE id="Guidelines" priority={ 3 } text={ formatMessage( messages.any_picture ) } >
			<DIV>Illustrations with guidelines</DIV>
		</TOGGLE>

	)

}

guidelines.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( guidelines )