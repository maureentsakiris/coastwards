import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'


import FORM from 'components/tags/form'
import LABEL from 'components/tags/label'
import INPUT from 'components/tags/input'

const messages = defineMessages( {

	select_images:{
		id: "select_images",
		description: "Status: Select your images",
		defaultMessage: "Select your images"
	},
	files_received: {
		id: "files_received",
		description: "Status: Informs user that we have received his files",
		defaultMessage: "We have received your files"
	},
	files_accepted: {
		id: "files_accepted",
		description: "Status: Informs user that we have accepted his files",
		defaultMessage: "We have accepted your files"
	},
	running_tests:{
		id: "running_tests",
		description: "Status: Running tests",
		defaultMessage: "Running tests"
	}

} )

const upload = ( { intl, status, onChange } ) => {

	const { formatMessage } = intl

	return(

		<FORM action="/contributions" method="post" id="upload" >
			<p>STATUS: { formatMessage( messages[ status ] ) }</p>
			<LABEL htmlFor="images" form="upload" >!Images</LABEL>
			<INPUT onChange={ onChange } form="upload" type="file" multiple={ true } accept="image/*" />
			{ status === 'ready_to_submit' && <INPUT form="upload" type="submit" /> }
		</FORM>

	)

}

upload.propTypes = {

	intl: intlShape.isRequired,
	status: PropTypes.string,
	onChange: PropTypes.func.isRequired

}

export default injectIntl( upload )