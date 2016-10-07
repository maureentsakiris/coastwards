import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'

import FORM from 'components/tags/form'

import EMAIL from 'components/form/input/email'
import COMMENT from 'components/form/input/comment'
import SUBMIT from  'components/form/button/submit'


import BR from 'components/tags/br'

import style from './_ask'

const messages = defineMessages( {

	ask_us:{
		id: "ask_us",
		description: "Header - Ask us!",
		defaultMessage: "Ask us! (In english please)"
	},
	one_more_question:{
		id: "one_more_question",
		description: "Section header - Contact us",
		defaultMessage: "Still have a question!"
	}, 
	one_more_question_title:{
		id: "one_more_question_title",
		description: "Section header title - Tell us your question (in english please)",
		defaultMessage: "Ask us (in english please)"
	},
	label_email:{
		id: "label_email",
		description: "Lable - Email",
		defaultMessage: "Your email"
	},
	placeholder_email: {
		id: "placeholder_email",
		description: "Placeholder - Email",
		defaultMessage: "And your email"
	},
	label_question:{
		id: "label_question",
		description: "Label - Your Question",
		defaultMessage: "Tell us your question"
	},
	placeholder_question:{
		id: "placeholder_question",
		description: "Placeholder - Tell us your question",
		defaultMessage: "Tell us your question"
	},
	label_submit:{
		id: "label_submit",
		description: "Label - Submit",
		defaultMessage: "Submit"
	}

} )

const ask = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<TOGGLE id="AskUs" title={ formatMessage( messages.one_more_question_title ) } priority={ 3 } text={ formatMessage( messages.one_more_question ) } className={ style.toggle } >
			<FORM action="#" id="Ask" >
				<COMMENT form="Ask" label={ formatMessage( messages.label_question ) } name="comment" placeholder={ formatMessage( messages.placeholder_question ) } />
				<BR />
				<EMAIL form="Ask" label={ formatMessage( messages.label_email ) } name="email" placeholder={ formatMessage( messages.placeholder_email ) } />
				<BR />
				<SUBMIT form="Ask" name="submit" label={ formatMessage( messages.label_submit ) } />
			</FORM>
		</TOGGLE>

	)

}

ask.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( ask ) 