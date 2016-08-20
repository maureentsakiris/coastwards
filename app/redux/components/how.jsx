import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import DIV from 'components/tags/div'

const messages = defineMessages( {

	how:{
		id: "how",
		description: "Section header - How does a picture help",
		defaultMessage: "How does a picture help?"
	},
	how_title:{
		id:"how_title",
		description: "Section header title - Watch a video (2min)",
		defaultMessage: "Watch a video (2min)"
	}

} )

const how = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<TOGGLE id="How" title={ formatMessage( messages.how_title ) } priority={ 3 } text={ formatMessage( messages.how ) } >
			<DIV>Explanatory video & transcript</DIV>
		</TOGGLE>

	)

}

how.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( how ) 