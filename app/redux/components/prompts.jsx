import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import A from 'components/tags/a'
import I from 'components/tags/i'


const messages = defineMessages( {

	close_prompts:{
		id: "close_prompts",
		description: "Hover title - Close",
		defaultMessage: "Close"
	},

	drag_and_drop:{
		id: "drag_and_drop",
		description: "Prompt - Prompts user to drag and drop images onto the world map (or click the big red button)",
		defaultMessage: "Drag & drop your images onto the world map to upload (or click the big red button)"
	},
	click_button:{
		id: "click_button",
		description: "Prompt - Prompts user to upload images by clicking on the big red button",
		defaultMessage: "Click the big red button to upload images"
	},

} )

const prompts = ( { intl, hide, prompt } ) => {

	const { formatMessage } = intl

	const err = messages[ prompt ] ? formatMessage( messages[ prompt ] ) : prompt


	return(

		<DIV id="Prompt" >
			<H priority={ 2 }>{ err }</H>
			<A href="#" onClick={ hide } title={ formatMessage( messages.close_prompts ) } ><I className="material-icons" >&#xE5CD;</I></A>
		</DIV>

	)
	
}

prompts.propTypes = {

	intl: intlShape.isRequired,
	hide: PropTypes.func,
	prompt: PropTypes.string

}

export default injectIntl( prompts )