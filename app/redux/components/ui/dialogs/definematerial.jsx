import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'


const messages = defineMessages( {

	definematerial_header:{
		id: "definematerial_header",
		description: "Header - What do you mean by 'coast material'?",
		defaultMessage: "What do you mean by 'coast material'?"
	},
	definematerial_text:{
		id: "definematerial_text",
		description: "P - ",
		defaultMessage: "TBD ... "
	}

} )


const definematerial = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<DIV>
			<H priority={ 2 }>{ formatMessage( messages.definematerial_header ) }</H>
			<P>{ formatMessage( messages.definematerial_text ) }</P>
		</DIV>

	)

}

definematerial.propTypes = {

	intl: intlShape,
	component: PropTypes.node,
	active: PropTypes.bool,
	closeDialog: PropTypes.func

}

export default injectIntl ( definematerial )
