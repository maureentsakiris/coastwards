import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import H from 'components/tags/h'
import FORM from 'components/tags/form'
import DIV from 'components/tags/div'
import INPUT from 'components/tags/input'
import P from 'components/tags/p'
import BUTTON from 'components/tags/button'
import A from 'components/tags/a'
import SPAN from 'components/tags/span'

const messages = defineMessages( {

	unsupported:{
		id: "unsupported",
		description: "Warning - Warns the user that his browser does not support the image upload",
		defaultMessage: "Hmm sorry, your browser does not support the technologies used to upload images. Update your browser to the latest version and it should work. See ya there!?"
	},
	all_set:{
		id: "all_set",
		description: "Section header - All set?",
		defaultMessage: "Do you have any pictures of coasts on your device? Why not upload them now?"
	},
	one_by_one:{
		id: "one_by_one",
		description: "Note - Informs user that only one image can be uploaded at a time",
		defaultMessage: "At the moment we can only accept one image at a time.",
	},
	check_for_batch_upload:{
		id: "check_for_batch_upload",
		description: "Link - Leads to a contact form for contributors with too many images to upload one by one",
		defaultMessage: "Check here if your images are viable for a batch upload"
	},
	status_validating:{
		id: "status_validating",
		description: "Status - Informs user that selected image(s) is being validated",
		defaultMessage:"Validating your image .. (just a few seconds)"
	},
	upload_image:{
		id: "upload_image",
		description: "Button label - Prompts the user to upload the image",
		defaultMessage: "UPLOAD"
	},


	//error messages
	exifdata_empty:{
		id: "exifdata_empty",
		description: "Error - Informs user that exifdata is missing and why that could be",
		defaultMessage: "Hm. We could not extract any metadata (we need that to know when the image was taken and more importantly where ). Social media, screenshots, scans"
	},

	//status messages
	status_hurray:{
		id: "status_hurray",
		description: "Status - Informs user that image validation was successfull",
		defaultMessage: "Awesome!!! Your image passed all the tests and can now be uploaded"
	},
	status_uploading:{
		id: "status_uploading",
		description: "Status - Informs user that his image is being uploaded",
		defaultMessage: "Uploading..."
	}

} )

const form = ( { intl, uploadSupported, validateFile, status, progress, uploadImage } ) => {

	const { formatMessage } = intl

	const stat = messages[ status ] ? formatMessage( messages[ status ] ) : status

	return(

		<DIV id="Upload" >
			<H priority={ 2 }>{ formatMessage( messages.all_set ) }</H>
			{ !uploadSupported && <p>{ formatMessage( messages.unsupported ) }</p> }
			{ uploadSupported && <FORM action="#" id="upload">
				<P>
					<small>( { formatMessage( messages.one_by_one ) } <A href="#" onClick={ ( ) => { } } >{ formatMessage( messages.check_for_batch_upload ) }</A> )</small>
				</P>
				<P>
					{ !status && <INPUT id="images" name="images" onChange={ validateFile } form="upload" type="file" multiple={ false } accept="image/*" /> }
					{ status && <SPAN>{ stat }</SPAN> }
					{ status == 'status_uploading' && <SPAN> { progress }%</SPAN> }
				</P>
				{ status == 'status_hurray' && <BUTTON onClick={ uploadImage }>{ formatMessage( messages.upload_image ) }</BUTTON> }
			</FORM> }
		</DIV>

	)
	
}

form.propTypes = {

	intl: intlShape.isRequired,
	uploadSupported: PropTypes.bool,
	validateFile: PropTypes.func,
	status: PropTypes.string,
	uploadImage: PropTypes.func,
	progress: PropTypes.number,
	preview: PropTypes.string

}

export default injectIntl( form )
