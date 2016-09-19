import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import DIV from 'components/tags/div'

import style from './_toggleQuestion'

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
		description: "... aren't satellite images enough?",
		defaultMessage: "... aren't satellite images enough?"
	},
	a1:{
		id: "a1",
		description: "...",
		defaultMessage: "..."
	},
	q2:{
		id: "q2",
		description: "... can the images I upload be traced back to me?",
		defaultMessage: "... can the images I upload be traced back to me?"
	},
	a2:{
		id: "a2",
		description: "Short answer: No. We have to save an IP address to be able to show that the image was uploaded by someone else, but an IP address gives us only a rough location (at best) and absolutely no personal information. In an effort to be as transparent as possible you can view the entire information we send to our server before you decide to upload the image.",
		defaultMessage: "Short answer: No. We have to save an IP address to be able to show that the image was uploaded by someone else, but an IP address gives us only a rough location (at best) and absolutely no personal information. In an effort to be as transparent as possible you can view the entire information we send to our server before you decide to upload the image."
	},
	q3:{
		id: "q3",
		description: "... do I have to provide any personal data?",
		defaultMessage: "... do I have to provide any personal data?"
	},
	a3:{
		id: "a3",
		description: "No",
		defaultMessage: "No. Absolutely not."
	},
	q4:{
		id: "q4",
		description: "... will I be notified about publications resulting from this project?",
		defaultMessage: "... will I be notified about publications resulting from this project?"
	},
	a4:{
		id: "a4",
		description: "Yes, of course. You can sign up for the newsletter to be notified.",
		defaultMessage: "Yes, of course. You can sign up for the newsletter to be notified."
	},
	q5:{
		id: "q5",
		description: "... who has access to the data you collect?",
		defaultMessage: "... who has access to the data you collect?"
	},
	a5:{
		id: "a5",
		description: "We will publish the data (not the images) under the public domain license.",
		defaultMessage: "We will publish the data (not the images) under the public domain license. "
	},
	q6:{
		id: "q6",
		description: "... how many pictures do you need?",
		defaultMessage: "... how many pictures do you need?"
	},
	a6:{
		id: "a6",
		description: "Short: The more, the better. There is not starting point or finishing line with this project. The more images we collect and analyse, the sharper becomes our picture of what types of coasts exist and where. This helps us ...",
		defaultMessage: "Short: The more, the better. There is not starting point or finishing line with this project. The more images we collect and analyse, the sharper becomes our picture of what types of coasts exist and where. This helps us ..."
	}

} )

const questions = ( { intl, className } ) => {

	const { formatMessage } = intl

	return(

		<DIV id="Questions"  className={ className } >
			<TOGGLE priority={ 4 } text={ formatMessage( messages.q1 ) } classNameHeader={ style.question }  >
				<DIV>{ formatMessage( messages.a1 ) }</DIV>
			</TOGGLE>
			<TOGGLE priority={ 4 } text={ formatMessage( messages.q2 ) } classNameHeader={ style.question }  >
				<DIV>{ formatMessage( messages.a2 ) }</DIV>
			</TOGGLE>
			<TOGGLE priority={ 4 } text={ formatMessage( messages.q3 ) } classNameHeader={ style.question }  >
				<DIV>{ formatMessage( messages.a3 ) }</DIV>
			</TOGGLE>
			<TOGGLE priority={ 4 } text={ formatMessage( messages.q4 ) } classNameHeader={ style.question }  >
				<DIV>{ formatMessage( messages.a4 ) }</DIV>
			</TOGGLE>
			<TOGGLE priority={ 4 } text={ formatMessage( messages.q5 ) } classNameHeader={ style.question }  >
				<DIV>{ formatMessage( messages.a5 ) }</DIV>
			</TOGGLE>
			<TOGGLE priority={ 4 } text={ formatMessage( messages.q6 ) } classNameHeader={ style.question }  >
				<DIV>{ formatMessage( messages.a6 ) }</DIV>
			</TOGGLE>
		</DIV>
	)

}

questions.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string

}

export default injectIntl( questions ) 