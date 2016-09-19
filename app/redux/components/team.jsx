import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import P from 'components/tags/p'
import H from 'components/tags/h'

import style from './_team'

const messages = defineMessages( {

	who_are_you:{
		id: "who_are_you",
		description: "Section header - Who are you?",
		defaultMessage: "Who are you?"
	},
	hi_there:{
		id: "hi_there",
		description: "Paragraph",
		defaultMessage: "We are the 'Coastal Risks and Sea-Level Rise Research Group' at the University of Kiel in Germany and this project is funded by the 'Future Ocean Excellence Cluster'."
	},
	we_are:{
		id: "we_are",
		description: "Paragraph",
		defaultMessage: "I'm Maureen, the project leader and this is the team of scientists:"
	},
	who_are_you_title:{
		id: "who_are_you_title",
		description: "Section header - Meet us!",
		defaultMessage: "Meet us!"
	}

} )

const team = ( { intl } ) => {

	const { formatMessage } = intl

	/*<P>Nassos</P>
			<P>Jörn</P>
			<P>Claudia</P>
			<P>Jan</P>
			<P>Sara</P>
			<P>Lena</P>
			<P>Neli</P>
			<P>Barbara</P>
			<P>Mark</P>
			<P>Maureen</P>
			<P className={ style.toggleDiv } >Figo</P>*/

	return(

		<TOGGLE id="Team" title={ formatMessage( messages.who_are_you_title ) } priority={ 3 } text={ formatMessage( messages.who_are_you ) } className={ style.toggle } >
			<H priority={ 4 }>{ formatMessage( messages.hi_there ) }</H>
		</TOGGLE>

	)

}

team.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( team ) 