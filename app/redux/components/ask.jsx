import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'

import FORM from 'components/tags/form'
import INPUT from 'components/tags/input'
import TEXTAREA from 'components/tags/textarea'
import LABEL from 'components/tags/label'
import H from 'components/tags/h'

import BR from 'components/tags/br'

const messages = defineMessages( {

	ask_us:{
		id: "ask_us",
		description: "Header - Ask us!",
		defaultMessage: "Ask us! (In english please)"
	},
	one_more_question:{
		id: "one_more_question",
		description: "Section header - Contact us",
		defaultMessage: "I still have a question!"
	}, 
	one_more_question_title:{
		id: "one_more_question_title",
		description: "Section header title - Tell us your question (in english please)",
		defaultMessage: "Tell us your question (in english please)"
	},
	label_email:{
		id: "label_email",
		description: "Lable - Email",
		defaultMessage: "Email"
	},
	placeholder_email: {
		id: "placeholder_email",
		description: "Placeholder - Email",
		defaultMessage: "Your email"
	},
	label_question:{
		id: "label_question",
		description: "Label - Your Question",
		defaultMessage: "Your question"
	},
	placeholder_question:{
		id: "placeholder_question",
		description: "Placeholder - Tell us your question",
		defaultMessage: "Tell us your question ..."
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

		<TOGGLE id="Ask" title={ formatMessage( messages.one_more_question_title ) } priority={ 4 } text={ formatMessage( messages.one_more_question ) } >
			<H priority={ 5 }>{ formatMessage( messages.ask_us ) }</H>
			<FORM action="#" id="ask" >
				<LABEL htmlFor="email" form="ask" >{ formatMessage( messages.label_email ) }:
					<BR />
					<INPUT type="email" name="email" form="ask" placeholder={ formatMessage( messages.placeholder_email ) } />
				</LABEL>
				<BR /><BR />
				<LABEL htmlFor="question" form="ask" >{ formatMessage( messages.label_question ) }:
					<BR />
					<TEXTAREA form="ask" name="question" placeholder={ formatMessage( messages.placeholder_question ) } />
				</LABEL>
				<BR /><BR />
				<INPUT type="submit" form="ask" name="submit" value={ formatMessage( messages.label_submit ) } />
			</FORM>
		</TOGGLE>

	)

}

ask.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( ask ) 