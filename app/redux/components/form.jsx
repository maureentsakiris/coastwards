import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import _ from 'underscore'

import H from 'components/tags/h'
import FORM from 'components/tags/form'
import DIV from 'components/tags/div'
import INPUT from 'components/tags/input'
import P from 'components/tags/p'
import BUTTON from 'components/tags/button'
import A from 'components/tags/a'
import SPAN from 'components/tags/span'
import IMG from 'components/tags/img'
import HR from 'components/tags/hr'

const messages = defineMessages( {

	unsupported:{
		id: "unsupported",
		description: "Warning - Warns the user that his browser does not support the image upload",
		defaultMessage: ":/ Looks like you are on an old browser that does not support some features we need to make this website work. Sorry, you'll need to upgrade or switch browsers to continue..."
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
		defaultMessage: "Contact us if you have too many to upload one by one"
	},
	upload_image:{
		id: "upload_image",
		description: "Button label - Prompts the user to upload the image",
		defaultMessage: "UPLOAD"
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
		defaultMessage: ":/ We couldn't find any metadata in your image. Our best guess is that it was sent through social media, like Facebook or Whatsapp, because they strip the metadata. Or, it might be a scan or a screenshot. We need the metadata to make sure the"
	},
	exifdata_undefined:{
		id: "exifdata_undefined",
		description: "Error - Informs user that exifdata is missing and why that could be",
		defaultMessage: "Hm, we couldn't extract the metadata from the image but we need that information to ensure at least some level of relevance to our research. Try this:"
	},
	image_size_undefined:{
		id: "image_size_undefined",
		description: "Error - Informs the user that we couldn't determine image size",
		defaultMessage: "We couldn't find information on the size of the image in the metadata. We need to make sure it is big enough to be analysed. This is rather unusual. Do you have the original file somewhere? Try that one!"
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
	location_undefined:{
		id: "location_undefined",
		description: "Error - Informs user that we couldn't extract information on the location it was taken",
		defaultMessage: "Ok so, you'll probably see this message a lot. We have the metadata but it does not tell us where the image was taken. Do you mind locating it for us on a map? (If you remember, of course)"
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
	upload_error:{
		id: "upload_error",
		description: "Error - Informs user that an error ocurred during upload",
		defaultMessage: "Crap, something went wrong during upload. I'm sure this is my fault (or maybe your connection is bad). Try again?"
	},


	//status messages
	status_validating:{
		id: "status_validating",
		description: "Status - Informs user that selected image(s) is being validated",
		defaultMessage:"Validating your image .. (just a few seconds)"
	},
	status_hurray:{
		id: "status_hurray",
		description: "Status - Informs user that image validation was successfull",
		defaultMessage: "Awesome!!! Your image passed all the tests and can now be uploaded"
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


	help_more:{
		id: "help_more",
		description: "Header - Asks user to help even more by answering a few questions",
		defaultMessage: "Two more questions though, if we may!"
	},
	img_alt: {
		id: "img_alt",
		description: "Alt - Alternative description of the uploaded image",
		defaultMessage: "Your image"
	},
	select_material:{
		id: "select_material",
		description: "Header - Asks user to describe the coast material",
		defaultMessage: "How would you describe the coast material?"
	},


	//materials
	sand:{
		id: "sand",
		description: "Material - Sand",
		defaultMessage: "Sand"
	},
	pebble:{
		id: "pebble",
		description: "Material - Pebble",
		defaultMessage: "Pebble"
	},
	rock:{
		id: "rock",
		description: "Material - Rock",
		defaultMessage: "Rock"
	},
	mud:{
		id: "mud",
		description: "Material - Mud",
		defaultMessage: "Mud"
	},
	manmade:{
		id: "manmade",
		description: "Material - Man-made",
		defaultMessage: "Man-made"
	},
	ice:{
		id: "ice",
		description: "Material - Ice",
		defaultMessage: "Ice"
	},
	notsure:{
		id: "notsure",
		description: "Material - Not sure",
		defaultMessage: "Not sure"
	}

} )

const form = ( { intl, uploadSupported, validateFile, status, image, setMaterial, progress, uploadImage } ) => {

	const { formatMessage } = intl

	const stat = messages[ status ] ? formatMessage( messages[ status ] ) : status
	const showSelectInput = status !== 'status_hurray' && status !== 'status_validating'

	return(

		<DIV id="Upload" >
			<H priority={ 2 }>{ formatMessage( messages.all_set ) }</H>
			{ !uploadSupported && <p>{ formatMessage( messages.unsupported ) }</p> }
			{ uploadSupported && <FORM action="#" id="upload">
				<P>
					<small>( { formatMessage( messages.one_by_one ) } <A href="#" onClick={ ( ) => { } } >{ formatMessage( messages.check_for_batch_upload ) }</A> )</small>
				</P>
				<HR/>
				{ !_.isEmpty( image ) &&
					<IMG src={ image.dataURL } alt={ formatMessage( messages.img_alt ) } width={ 400 } />
				}
				<H priority={ 2 }>
					{ status && <SPAN>{ stat }</SPAN> }
					{ status == 'status_uploading' && <SPAN> { progress }%</SPAN> }
				</H>
				<H priority={ 2 }>
					{ showSelectInput && <INPUT id="images" name="images" onChange={ validateFile } form="upload" type="file" multiple={ false } accept="image/*" /> }
				</H>
				{ !_.isEmpty( image ) && 
					<DIV>
						<H priority={ 3 }>{ formatMessage( messages.help_more ) }</H>
						<H priority={ 4 }>{ formatMessage( messages.select_material ) }</H>
						<SPAN><INPUT form="upload" type="radio" name="material" value="sand" onClick={ setMaterial } />{ formatMessage( messages.sand ) }</SPAN>
						<SPAN><INPUT form="upload" type="radio" name="material" value="pebbles" onClick={ setMaterial } />{ formatMessage( messages.pebble ) }</SPAN>
						<SPAN><INPUT form="upload" type="radio" name="material" value="rock" onClick={ setMaterial } />{ formatMessage( messages.rock ) }</SPAN>
						<SPAN><INPUT form="upload" type="radio" name="material" value="mud" onClick={ setMaterial } />{ formatMessage( messages.mud ) }</SPAN>
						<SPAN><INPUT form="upload" type="radio" name="material" value="ice" onClick={ setMaterial } />{ formatMessage( messages.ice ) }</SPAN>
						<SPAN><INPUT form="upload" type="radio" name="material" value="manmade" onClick={ setMaterial } />{ formatMessage( messages.manmade ) }</SPAN>
						<SPAN><INPUT form="upload" type="radio" name="material" value="notsure" onClick={ setMaterial } />{ formatMessage( messages.notsure ) }</SPAN>
					</DIV> 
				}
				{ status == 'status_hurray' && <P><BUTTON onClick={ uploadImage }>{ formatMessage( messages.upload_image ) }</BUTTON></P> }
			</FORM> }
		</DIV>

	)
	
}

form.propTypes = {

	intl: intlShape.isRequired,
	uploadSupported: PropTypes.bool,
	validateFile: PropTypes.func,
	status: PropTypes.string,
	image: PropTypes.object,
	setMaterial: PropTypes.func,
	uploadImage: PropTypes.func,
	progress: PropTypes.number

}

export default injectIntl( form )
