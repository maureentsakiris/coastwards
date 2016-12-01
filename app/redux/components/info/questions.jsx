import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import DIV from 'components/tags/div'
import A from 'components/tags/a'

import style from './_questions'


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
		description: "Satellite images ...",
		defaultMessage: "Satellite images ..."
	},
	q2:{
		id: "q2",
		description: "Can the images I upload be traced back to me?",
		defaultMessage: "Can the images I upload be traced back to me?"
	},
	a2:{
		id: "a2",
		description: "Short answer: No. We have to save your IP address but it only gives us a rough location (at best) and absolutely no personal information. In an effort to be as transparent as possible you can view the entire information we send to our server before you decide to upload the image.",
		defaultMessage: "Short answer: No. We have to save your IP address but it only gives us a rough location (at best) and absolutely no personal information. In an effort to be as transparent as possible you can view the entire information we send to our server before you decide to upload the image."
	},
	a2_why:{
		id: "a2_why",
		description: "Link - ",
		defaultMessage: "Why do you need my IP Address?"
	},
	q3:{
		id: "q3",
		description: "Do I have to provide any personal data?",
		defaultMessage: "Do I have to provide any personal data?"
	},
	a3:{
		id: "a3",
		description: "No",
		defaultMessage: "No. Absolutely not."
	},
	q4:{
		id: "q4",
		description: "Will I be notified about publications resulting from this project?",
		defaultMessage: "Will I be notified about publications resulting from this project?"
	},
	a4:{
		id: "a4",
		description: "Yes, of course. You can sign up for the newsletter to be notified.",
		defaultMessage: "Yes, of course. You can sign up for the newsletter to be notified."
	},
	q5:{
		id: "q5",
		description: "Who has access to the data you collect?",
		defaultMessage: "Who has access to the data you collect?"
	},
	a5:{
		id: "a5",
		description: "We will publish the data (not the images) under the public domain license.",
		defaultMessage: "We will publish the data (not the images) under the public domain license. "
	},
	q6:{
		id: "q6",
		description: "How many pictures do you need?",
		defaultMessage: "How many pictures do you need?"
	},
	a6:{
		id: "a6",
		description: "Short: The more, the better. There is not starting point or finishing line with this project. The more images we collect and analyse, the sharper becomes our picture of what types of coasts exist and where.",
		defaultMessage: "Short: The more, the better. There is not starting point or finishing line with this project. The more images we collect and analyse, the sharper becomes our picture of what types of coasts exist and where."
	}

} )

const questions = ( { intl, showDialog } ) => {

	const { formatMessage } = intl

	/*<TOGGLE priority={ 4 } text={ formatMessage( messages.q1 ) } className={ style.toggle } >
				<DIV>{ formatMessage( messages.a1 ) }</DIV>
			</TOGGLE>
			<TOGGLE priority={ 4 } text={ formatMessage( messages.q4 ) } className={ style.toggle } >
				<DIV>{ formatMessage( messages.a4 ) }</DIV>
			</TOGGLE><TOGGLE priority={ 4 } text={ formatMessage( messages.q5 ) } className={ style.toggle } >
				<DIV>{ formatMessage( messages.a5 ) }</DIV>
			</TOGGLE>*/

	return(

		<DIV id="Questions" >
			
			<TOGGLE priority={ 4 } text={ formatMessage( messages.q2 ) } className={ style.toggle } >
				<DIV>{ formatMessage( messages.a2 ) } <A onClick={ showDialog.bind( this, 'WHYIP' ) }>{ formatMessage( messages.a2_why ) }</A></DIV>
			</TOGGLE>
			<TOGGLE priority={ 4 } text={ formatMessage( messages.q3 ) } className={ style.toggle } >
				<DIV>{ formatMessage( messages.a3 ) }</DIV>
			</TOGGLE>
			<TOGGLE priority={ 4 } text={ formatMessage( messages.q6 ) } className={ style.toggle } >
				<DIV>{ formatMessage( messages.a6 ) }</DIV>
			</TOGGLE>
		</DIV>
	)

}

questions.propTypes = {

	intl: intlShape.isRequired,

	showDialog: PropTypes.func

}

export default injectIntl( questions ) 