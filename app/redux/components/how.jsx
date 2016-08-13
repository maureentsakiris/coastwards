import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import DIV from 'components/tags/div'

const messages = defineMessages( {

	how:{
		id: "how",
		description: "Section Header. How does a picture help",
		defaultMessage: "How does a picture help?"
	}

} )

const how = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<TOGGLE id="How" priority={ 3 } text={ formatMessage( messages.how ) } >
			<DIV>Explanatory video & transcript</DIV>
		</TOGGLE>

	)

}

how.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( how )