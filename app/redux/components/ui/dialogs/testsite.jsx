import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'


const messages = defineMessages( {

	testsite_header:{
		id: "testsite_header",
		description: "Header - ",
		defaultMessage: "Just a short comment before you delve in ..."
	},
	testsite_text:{
		id: "testsite_text",
		description: "P - ",
		defaultMessage: "This the 'bare bones' version of coastwards.org."
	}

} )


const testsite = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<DIV>
			<H priority={ 2 }>{ formatMessage( messages.testsite_header ) }</H>
			<P>So, this is the 'bare bones' version of coastwards.org and it still isn't completely finished. Have a look around, try uploading an image of a coast and tell me how it worked for you. I will NOT save the images you upload, so please keep them close!</P>
			<br />
			<P>Thanks! Maureen</P>
			<br/>
			<small>Ah, and I haven't adapted the site for mobile phones yet (though it works quite well already)</small>
		</DIV>

	)

}

testsite.propTypes = {

	intl: intlShape,
	component: PropTypes.node,
	active: PropTypes.bool,
	closeDialog: PropTypes.func

}

export default injectIntl ( testsite )
