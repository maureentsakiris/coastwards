import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import ACTIONS from 'containers/main/actions'
import DIV from 'components/tags/div'
import H from 'components/tags/h'

import style from './_errors'


const messages = defineMessages( {

	//error messages
	error_parsing_geojson:{
		id: "error_parsing_geojson",
		description: "Error - ",
		defaultMessage: "Crap, the pictures are not loading. Try refreshing the page!"
	},
	error_loading_mapbox:{
		id: "error_loading_mapbox",
		description: "Error",
		defaultMessage: "Crap, the map is not loading. Try refreshing the page!"
	},
	files_undefined:{
		id: "files_undefined",
		description: "Error - Informs user that no files were selected",
		defaultMessage: "No files were selected."
	},
	wrong_filetype:{
		id: "wrong_filetype",
		description: "Error - Informs the user that the selected image has the wrong file type",
		defaultMessage: "The file you selected is not an image. It should have of the following extensions: jpg, jpeg, tif, tiff, gif or png"
	},
	/*duplicate_file:{
		id: "duplicate_file",
		description: "Error - Informs user that the file has already been selected before",
		defaultMessage: "You've already selected this file before!"
	},*/
	exifdata_empty:{
		id: "exifdata_empty",
		description: "Error - Informs user that exifdata is missing and why that could be",
		defaultMessage: "We couldn't find any metadata in your image. Our best guess is that it was sent through social media, like Facebook or Whatsapp, or, it might be a scan or a screenshot. Do you have the original image? Try that one!"
	},
	image_too_small:{
		id: "image_too_small",
		description: "Error - Informs user that the image is too small",
		defaultMessage: "Your image is too small for us to analyse. Do you have the original file somewhere? Try that one!"
	},
	orientation_undefined:{
		id: "orientation_undefined",
		description:"Error - Informs user that image orientation is undefined",
		defaultMessage: "The metadata is not complete. Did you maybe apply a filter? Try the original one!"
	},
	faces_detected:{
		id: "faces_detected",
		description: "Error - Informs user that faces were detected in image",
		defaultMessage: "Sorry, for privacy concerns we have to reject images with faces"
	},
	spam_detected:{
		id: "spam_detected",
		description: "Error - Informs user that image did not pass spam filter",
		defaultMessage: "You sure that's a picture of a coast? We have our doubts..."
	},
	not_a_coast:{
		id: "not_a_coast",
		description: "Error - Informs user that image probably does not depict a coast",
		defaultMessage: "This doesn't look like a coast. Or at least the image annotation software doesn't think so. Sorry, try another one!"
	}, 
	location_undefined:{
		id: "location_undefined",
		description: "Error - Informs user that we couldn't extract the location from the metadata",
		defaultMessage: "That's too bad. We need to know where the coast is located but we couldn't find that information in the metadata. Switch to a modern browser to locate the coast for us (unfortunately your browser doesn't support some of the features necessary to do that) or try uploading an image that was taken with a mobile or digital camera."
	},
	/*no_datetime:{
		id: "no_datetime",
		description: "Error - ",
		defaultMessage: "We couldn't find the date and time you took this picture. Do you have the original? Try that one!"
	},*/
	problems_connecting:{
		id: "problems_connecting",
		description: "Error",
		defaultMessage: "We could not connect to the image annotation service. Please try again!"
	},
	problems_from_google:{
		id: "problems_from_google",
		description: "Error",
		defaultMessage: "The image annotation software returned an error. Please try again!"
	},
	upload_error:{
		id: "upload_error",
		description: "Error - Informs user that an error ocurred during upload",
		defaultMessage: "Crap, something went wrong during upload. I'm sure this is my fault (or maybe your connection is bad). Try again?"
	},
	make_blacklisted:{
		id: "make_blacklisted",
		description: "Error - ",
		defaultMessage: "Hm, looks like the image was taken with an App that uses color filters, e.g. Hipstamatic. Sorry, try another one!"
	}
	

} )

const errors = ( { intl, className, jazzSupported, show, error, upload } ) => {

	const { formatMessage } = intl

	const str = messages[ error ] ? formatMessage( messages[ error ] ) : error



	if( !jazzSupported ){

		const clsNoJazz = Classnames( style.noJazz, {

			[ style.show ]: show

		} )

		return(

			<DIV id="Errors" className={ clsNoJazz } >
				<H priority={ 2 }>{ str }</H>
			</DIV>

		)

	}else{

		return (

			<DIV>error</DIV>

		)

		/*const cls = Classnames( className, style.errors, {

			[ style.show ]: show

		} )

		return(

			<DIV id="Errors" className={ cls } >
				<H priority={ 2 }>{ str }</H>
				{ upload && <ACTIONS /> }
			</DIV>

		)*/

	}
	
}

errors.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,
	jazzSupported: PropTypes.bool,
	show: PropTypes.bool,
	error: PropTypes.string,
	upload: PropTypes.bool

}

export default injectIntl( errors )