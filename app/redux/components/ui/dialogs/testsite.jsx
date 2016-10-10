import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'


const messages = defineMessages( {

	testsite_header:{
		id: "testsite_header",
		description: "Header - ",
		defaultMessage: "Testing site!!!"
	},
	testsite_text:{
		id: "testsite_text",
		description: "P - ",
		defaultMessage: "Hi there! You have reached the ALPHA version of COASTWARDS. THIS SITE IS CURRENTLY UNDER CONSTRUCTION but we are always happy to get feedback so please have a look around. We will NOT SAVE images you upload, so please keep them close for the final version!"
	}

} )


const testsite = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<DIV>
			<H priority={ 2 }>{ formatMessage( messages.testsite_header ) }</H>
			<P>Hi there! You have reached the ALPHA version of COASTWARDS. THIS SITE IS CURRENTLY UNDER CONSTRUCTION but we are always happy to get feedback so please have a look around. We will NOT SAVE images you upload, so please keep them close for the final version!</P>
			<br />
			<P>Thank you! Maureen <br /> <a href="mailTo:tsakiris@geographie.uni-kiel.de" >tsakiris@geographie.uni-kiel.de</a></P>
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
