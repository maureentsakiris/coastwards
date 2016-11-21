import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'


const messages = defineMessages( {

	definematerial_header:{
		id: "definematerial_header",
		description: "Header - What do you mean by 'coast material'?",
		defaultMessage: "By 'coast material' we mean"
	},
	definematerial_text:{
		id: "definematerial_text",
		description: "P - ",
		defaultMessage: "the material that touches the water. If you were water, what would you first run into on land? Sand? Hard Rock? Of course there are in-betweens. If in doubt choose the material that is smaller. E.g. Sand over Pebble."
	}

} )


const definematerial = ( { intl, className } ) => {

	const { formatMessage } = intl

	return(

		<DIV className={ className } >
			<H priority={ 2 }>{ formatMessage( messages.definematerial_header ) }</H>
			<P>{ formatMessage( messages.definematerial_text ) }</P>
		</DIV>

	)

}

definematerial.propTypes = {

	intl: intlShape,
	className: PropTypes.string

}

export default injectIntl ( definematerial )
