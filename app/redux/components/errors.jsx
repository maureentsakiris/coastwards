import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import P from 'components/tags/p'
import A from 'components/tags/a'
import I from 'components/tags/i'


const messages = defineMessages( {

	close:{
		id: "close",
		description: "Hover title - Close",
		defaultMessage: "Close"
	},

	//error messages
	files_undefined:{
		id: "files_undefined",
		description: "Error - Informs user that no files were selected",
		defaultMessage: "No files were selected."
	},
	wrong_filetype:{
		id: "wrong_filetype",
		description: "Error - Informs the user that the selected image has the wrong file type",
		defaultMessage: "Em... the file you selected is not an image. It should have of the following extensions: jpg, jpeg, tif, tiff, gif or png"
	},
	duplicate_file:{
		id: "duplicate_file",
		description: "Error - Informs user that the file has already been selected before",
		defaultMessage: "You've already selected this file before!"
	},
	exifdata_empty:{
		id: "exifdata_empty",
		description: "Error - Informs user that exifdata is missing and why that could be",
		defaultMessage: "We couldn't find any metadata in your image. Our best guess is that it was sent through social media, like Facebook or Whatsapp, because they strip the metadata. Or, it might be a scan or a screenshot. We need the metadata to run some tests that make sure the images being uploaded have some relevance to the project. Try another one!"
	},
	image_too_small:{
		id: "image_too_small",
		description: "Error - Informs user that the image is too small",
		defaultMessage: "Your image is too small for us to analyse. Do you have the original file somewhere? Try that one!"
	},
	orientation_undefined:{
		id: "orientation_undefined",
		description:"Error - Informs user that image orientation is undefined",
		defaultMessage: "We couldn't find information on image's orientation so we can't rotate it for image validation. Bummer, but keep on trying!"
	},
	faces_detected:{
		id: "faces_detected",
		description: "Error - Informs user that faces were detected in image",
		defaultMessage: "Sorry, for privacy concerns we have to reject images with faces... (Yeah, selfies, too)"
	},
	spam_detected:{
		id: "spam_detected",
		description: "Error - Informs user that image did not pass spam filter",
		defaultMessage: "You sure that's a picture of a coast? We have our doubts..."
	},
	not_a_coast:{
		id: "not_a_coast",
		description: "Error - Informs user that image probably does not depict a coast",
		defaultMessage: "So, clever alogrithms tell us that this image probably does not depict a coast. Sorry, we have to set some filters to ensure the image's relevance to our research. Try another one!"
	},
	location_undefined:{
		id: "location_undefined",
		description: "Error - Informs user that we couldn't extract the location from the metadata",
		defaultMessage: "That's too bad. We need to know where the coast is located but we couldn't find that information in the metadata. Switch to a modern browser to locate the coast for us (unfortenately yours doesn't support some of the features we need) or try uploading an image that was taken with a mobile or digital camera."
	},



	upload_error:{
		id: "upload_error",
		description: "Error - Informs user that an error ocurred during upload",
		defaultMessage: "Crap, something went wrong during upload. I'm sure this is my fault (or maybe your connection is bad). Try again?"
	}

} )

const errors = ( { intl, show, error, hide } ) => {

	const { formatMessage } = intl

	const err = messages[ error ] ? formatMessage( messages[ error ] ) : error

	const style = {

		display: show ? 'block' : 'none'

	}


	return(

		<DIV id="Errors" style={ style } >
			<P>{ err } <A href="#" onClick={ hide } title={ formatMessage( messages.close ) } ><I className="material-icons" style={ { verticalAlign: 'middle' } } >&#xE5CD;</I></A></P>
		</DIV>

	)
	
}

errors.propTypes = {

	intl: intlShape.isRequired,

	show: PropTypes.bool,
	error: PropTypes.string,

	hide: PropTypes.func,

}

export default injectIntl( errors )