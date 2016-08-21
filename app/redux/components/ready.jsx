import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import P from 'components/tags/p'
import BUTTON from 'components/tags/button'

const messages = defineMessages( {

	prompt_upload:{
		id: "prompt_upload",
		description: "Prompt - Prompts user to upload images",
		defaultMessage: "Add your images to this map of coasts. Click the red button to upload."
	},
	got_it:{
		id: "got_it",
		description: "Button - Leads to upload form and map",
		defaultMessage: "GOT IT"
	},
	wait_question:{
		id: "wait_question",
		description: "Button - Leads to contact form",
		defaultMessage: "I still have a question"
	}

} )

const ready = ( { intl, setVisibility } ) => {

	const { formatMessage } = intl

	return(

		<DIV>
			<P>{ formatMessage( messages.prompt_upload ) }</P>
			<BUTTON onClick={ setVisibility.bind( this, { ready: false, form: true } ) } >{ formatMessage( messages.got_it ) }</BUTTON>
			<BUTTON  >{ formatMessage( messages.wait_question ) }</BUTTON>
		</DIV>

	)

}

ready.propTypes = {

	intl: intlShape.isRequired,
	setVisibility: PropTypes.func

}

export default injectIntl( ready ) 