import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import Questions from 'components/Questions'

import TOGGLE from 'components/ui/toggle'

import style from '_base'

const messages = defineMessages( {

	other_questions:{
		id: "other_questions",
		description: "Section header - Other questions...",
		defaultMessage: "Other questions..."
	},
	other_questions_title:{
		id: "other_questions_title",
		description: "Section header title - Read the FAQs",
		defaultMessage: "Read the FAQs"
	}

} )

const faqs = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<TOGGLE id="Faqs" title={ formatMessage( messages.other_questions_title ) } priority={ 3 } text={ formatMessage( messages.other_questions ) } className={ style.corset } >
			<Questions />
		</TOGGLE>
	)

}

faqs.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( faqs ) 