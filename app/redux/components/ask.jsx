import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import FORM from 'components/tags/form'
import INPUT from 'components/tags/input'
import TEXTAREA from 'components/tags/textarea'
import LABEL from 'components/tags/label'

const messages = defineMessages( {

	ask_a_question:{
		id: "ask_a_question",
		description: "Section header - Ask us",
		defaultMessage: "Still have a question? Ask us! ( in english )"
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

		<DIV>
			<H priority={ 4 } >{ formatMessage( messages.ask_a_question ) }</H>
			<FORM action="#" id="ask" >
				<LABEL htmlFor="email" form="ask" >{ formatMessage( messages.label_email ) }
					<INPUT type="email" name="email" form="ask" placeholder={ formatMessage( messages.placeholder_email ) } />
				</LABEL>
				<LABEL htmlFor="question" form="ask" >{ formatMessage( messages.label_question ) }
					<TEXTAREA form="ask" name="question" placeholder={ formatMessage( messages.placeholder_question ) } />
				</LABEL>
				<INPUT type="submit" form="ask" name="submit" value={ formatMessage( messages.label_submit ) } />
			</FORM>
		</DIV>

	)

}

ask.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( ask ) 