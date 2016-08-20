import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import DIV from 'components/tags/div'

const messages = defineMessages( {

	any_picture:{
		id: "any_picture",
		description: "Section header - Just any picture?",
		defaultMessage: "Just any picture?"
	},
	any_picture_title:{
		id: "any_picture_title",
		description: "Section header title - Some quick guidelines",
		defaultMessage: "Some quick guidelines"
	}

} )

const guidelines = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<TOGGLE id="Guidelines" title={ formatMessage( messages.any_picture_title ) } priority={ 3 } text={ formatMessage( messages.any_picture ) } >
			<DIV>Illustrations with guidelines</DIV>
		</TOGGLE>

	)

}

guidelines.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( guidelines )