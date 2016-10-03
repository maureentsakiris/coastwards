import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import Questions from 'containers/questions'


import TOGGLE from 'components/ui/toggle'
import FORM from 'components/tags/form'

import EMAIL from 'components/form/input/email'
import COMMENT from 'components/form/input/comment'
import SUBMIT from  'components/form/button/submit'
import BR from 'components/tags/br'

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

	//form
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
		defaultMessage: "Your email"
	},
	label_question:{
		id: "label_question",
		description: "Label - Your Question",
		defaultMessage: "Still have a question? Ask us! (In english, please)"
	},
	placeholder_question:{
		id: "placeholder_question",
		description: "Placeholder - Still have a question? Ask us! (In english, please)",
		defaultMessage: "Still have a question? Ask us! (In english, please)"
	},
	label_submit:{
		id: "label_submit",
		description: "Label - Submit",
		defaultMessage: "Submit"
	}

} )

const faqs = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<TOGGLE id="Faqs" title={ formatMessage( messages.other_questions_title ) } priority={ 3 } text={ formatMessage( messages.other_questions ) } className={ style.toggle } >
			<Questions />
			<FORM action="#" id="Ask"  className={ style.ask } >
				<COMMENT form="Ask" label={ formatMessage( messages.label_question ) } name="comment" placeholder={ formatMessage( messages.placeholder_question ) } />
				<BR />
				<EMAIL form="Ask" label={ formatMessage( messages.label_email ) } name="email" placeholder={ formatMessage( messages.placeholder_email ) } />
				<BR />
				<SUBMIT form="Ask" name="submit" label={ formatMessage( messages.label_submit ) } />
			</FORM>
		</TOGGLE>
	)

}

faqs.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( faqs ) 