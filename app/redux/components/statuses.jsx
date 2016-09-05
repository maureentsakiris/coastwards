import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'


const messages = defineMessages( {

	status_validating:{
		id: "status_validating",
		description: "Status - Informs user that selected image(s) is being validated",
		defaultMessage:"Validating your image .. (just a few seconds)"
	},
	status_uploading:{
		id: "status_uploading",
		description: "Status - Informs user that his image is being uploaded",
		defaultMessage: "Uploading..."
	},
	status_upload_ok:{
		id: "status_upload_ok",
		description: "Status - Informs user that his image was uploaded successfully",
		defaultMessage: "WOHOO! Nice one! Your image was uploaded. Next one! :)"
	},

} )

const statuses = ( { intl, show, status } ) => {

	const { formatMessage } = intl

	const stat = messages[ status ] ? formatMessage( messages[ status ] ) : status

	const style = {

		display: show ? 'block' : 'none'

	}

	return(

		<DIV id="Statuses" style={ style } >
			<H priority={ 2 }>{ stat }</H>
		</DIV>

	)
	
}

statuses.propTypes = {

	intl: intlShape.isRequired,

	show: PropTypes.bool,
	status: PropTypes.string,

	resetForm: PropTypes.func

}

export default injectIntl( statuses )