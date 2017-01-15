import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

/*import Questions from 'containers/questions'*/

import TOGGLE from 'components/ui/toggle'
import P from 'components/tags/p'

import style from './_faqs'

const messages = defineMessages( {

	other_questions:{
		id: "other_questions",
		description: "Section header - ... ??",
		defaultMessage: "... ??"
	},
	other_questions_title:{
		id: "other_questions_title",
		description: "Section header title - Read the FAQs",
		defaultMessage: "Read the FAQs"
	},
	send_me_yours:{
		id: "send_me_yours",
		description: "Prompt",
		defaultMessage: "Ok, this is the part where I need your help. Please tell me your questions so I can put together this FAQs section. Click on 'Still have a question!' and send me yours. Thank you so much!"
	}

} ) 

const faqs = ( { intl } ) => {

	const { formatMessage } = intl

	/*<Questions />*/

	return(

		<TOGGLE id="Faqs" title={ formatMessage( messages.other_questions_title ) } priority={ 3 } text={ formatMessage( messages.other_questions ) } className={ style.toggle } >
			<P><strong>{ formatMessage( messages.send_me_yours ) }</strong></P>
		</TOGGLE>
	)

}

faqs.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( faqs ) 