import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'


const messages = defineMessages( {

	definematerial_header:{
		id: "definematerial_header",
		description: "Header - What do you mean by 'coast material'?",
		defaultMessage: "Define 'coast material'"
	},
	definematerial_text:{
		id: "definematerial_text",
		description: "P - ",
		defaultMessage: "The coast material is the material that touches the water. If your coast has more than one material listed in the options choose the one that is prevalent. If still in doubt, ask yourself which material is probably under water. (I am working on a better description with the scientists here but you can always select 'Not sure')"
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
