import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import H from 'components/tags/h'
import DIV from 'components/tags/div'
import BUTTON from 'components/tags/button'


const messages = defineMessages( {

	can_you_locate:{
		id: "can_you_locate",
		description: "Status - Informs user that we couldn't extract the location from the metadata and prompts user to locate the image for us",
		defaultMessage: "Ok so, you'll probably see this message more often than we'd like to admit. We have the metadata but it does not tell us where the image was taken. Do you remember the exact location of this coast?"
	},

	yes_location_known:{
		id: "yes_location_known",
		description: "Label - Yes, I can locate this coast",
		defaultMessage: "Yes, I can locate this coast"
	},
	no_location_unknown:{
		id: "no_location_unknown",
		description: "Label - No, I don't remember",
		defaultMessage: "No, I don't remember"
	}

} )

const main = ( { intl, show, locateCoast, resetMain } ) => {

	const { formatMessage } = intl

	const style = {

		display: show ? 'block' : 'none'

	}

	return(

		<DIV id="Locate" style={ style } >
			<H priority={ 2 }>{ formatMessage( messages.can_you_locate ) }</H>
			<BUTTON type="button" onClick={ locateCoast }>{ formatMessage( messages.yes_location_known ) }</BUTTON>
			<BUTTON type="button" onClick={ resetMain }>{ formatMessage( messages.no_location_unknown ) }</BUTTON>
		</DIV> 

	)
	
}

main.propTypes = {

	intl: intlShape.isRequired,

	show: PropTypes.bool,

	locateCoast: PropTypes.func,
	resetMain: PropTypes.func

}

export default injectIntl( main )
