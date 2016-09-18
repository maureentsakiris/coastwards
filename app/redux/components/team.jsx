import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import P from 'components/tags/p'

import style from '_base'

const messages = defineMessages( {

	who_are_you:{
		id: "who_are_you",
		description: "Section header - Who are you?",
		defaultMessage: "Who are you?"
	},
	who_are_you_title:{
		id: "who_are_you_title",
		description: "Section header - Meet us!",
		defaultMessage: "Meet us!"
	}

} )

const team = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<TOGGLE id="Team" title={ formatMessage( messages.who_are_you_title ) } priority={ 3 } text={ formatMessage( messages.who_are_you ) } className={ style.corset } classNameHeader={ style.italic } >
			<P>Nassos</P>
			<P>Jörn</P>
			<P>Claudia</P>
			<P>Jan</P>
			<P>Sara</P>
			<P>Lena</P>
			<P>Neli</P>
			<P>Barbara</P>
			<P>Mark</P>
			<P>Maureen</P>
			<P>Figo</P>
		</TOGGLE>

	)

}

team.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( team ) 