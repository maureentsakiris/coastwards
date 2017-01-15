import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'


const messages = defineMessages( {

	
 
} )


const imprint = ( { intl, className } ) => {

	const { formatMessage } = intl

	return(

		<DIV className={ className } >
			<H priority={ 2 }>Impressum</H>
			<P>...</P>
		</DIV>

	)

}

imprint.propTypes = {

	intl: intlShape,
	className: PropTypes.string

}

export default injectIntl ( imprint )
