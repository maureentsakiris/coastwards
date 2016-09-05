import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import DIV from 'components/tags/div'

const messages = defineMessages( {

	/*faqs:{
		id: "faqs",
		description: "Section header - FAQs",
		defaultMessage: "Frequently asked questions"
	},
	faqs_title:{
		id: "faqs_title",
		description: "Section header - Read the FAQs",
		defaultMessage: "Read the FAQs"
	},*/
	q1:{
		id: "q1",
		description: "Aren't satellite images enough?",
		defaultMessage: "Aren't satellite images enough?"
	},
	a1:{
		id: "a1",
		description: "No",
		defaultMessage: "No, they give us a general idea but not enough to be certain"
	},
	q2:{
		id: "q2",
		description: "Aren't satellite images enough?",
		defaultMessage: "Aren't satellite images enough?"
	},
	a2:{
		id: "a2",
		description: "No",
		defaultMessage: "No, they give us a general idea but not enough to be certain"
	},
	q3:{
		id: "q3",
		description: "Aren't satellite images enough?",
		defaultMessage: "Aren't satellite images enough?"
	},
	a3:{
		id: "a3",
		description: "No",
		defaultMessage: "No, they give us a general idea but not enough to be certain"
	},
	q4:{
		id: "q4",
		description: "Aren't satellite images enough?",
		defaultMessage: "Aren't satellite images enough?"
	},
	a4:{
		id: "a4",
		description: "No",
		defaultMessage: "No, they give us a general idea but not enough to be certain"
	}

} )

const questions = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<DIV id="Questions">
			<TOGGLE priority={ 4 } text={ formatMessage( messages.q1 ) } >
				<DIV>{ formatMessage( messages.a1 ) }</DIV>
			</TOGGLE>
			<TOGGLE priority={ 4 } text={ formatMessage( messages.q2 ) } >
				<DIV>{ formatMessage( messages.a2 ) }</DIV>
			</TOGGLE>
			<TOGGLE priority={ 4 } text={ formatMessage( messages.q3 ) } >
				<DIV>{ formatMessage( messages.a3 ) }</DIV>
			</TOGGLE>
			<TOGGLE priority={ 4 } text={ formatMessage( messages.q4 ) } >
				<DIV>{ formatMessage( messages.a4 ) }</DIV>
			</TOGGLE>
		</DIV>
	)

}

questions.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( questions ) 