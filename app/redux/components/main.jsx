import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import Errors from 'containers/errors'
import Statuses from 'containers/statuses'
import Prompts from 'containers/prompts'

import H from 'components/tags/h'
import FORM from 'components/tags/form'
import DIV from 'components/tags/div'
import SMALL from 'components/tags/small'
import P from 'components/tags/p'
import A from 'components/tags/a'
import HR from 'components/tags/hr'

import INPUT from 'components/tags/input'
import BUTTON from 'components/tags/button'


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
	},

	//locate
	status_location_undefined:{
		id: "status_location_undefined",
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

const main = ( { intl, uploadSupported, showUpload, showPrompts, showErrors, showStatuses, showLocate, showGeolocator, showForm, validateFile, locateCoast, resetForm } ) => {

	const { formatMessage } = intl

	return(

		<DIV id="Upload" >
			<H priority={ 2 }>{ formatMessage( messages.all_set ) }</H>
			{ !uploadSupported && <p>{ formatMessage( messages.unsupported ) }</p> }
			{ uploadSupported && <FORM action="#" id="upload">
				<SMALL>( { formatMessage( messages.one_by_one ) } <A href="#" onClick={ ( ) => { } } >{ formatMessage( messages.check_for_batch_upload ) }</A> )</SMALL>
				<HR/>
				{ showErrors && <Errors /> }
				{ showStatuses && <Statuses /> }
				{ showPrompts && <Prompts /> }
				{ showUpload && <INPUT id="images" name="images" onChange={ validateFile } form="upload" type="file" multiple={ false } accept="image/*" /> }
				{ showLocate && 
					<DIV>
						<H priority={ 2 }>{ formatMessage( messages.status_location_undefined ) }</H>
						<BUTTON type="button" onClick={ locateCoast }>{ formatMessage( messages.yes_location_known ) }</BUTTON>
						<BUTTON type="button" onClick={ resetForm }>{ formatMessage( messages.no_location_unknown ) }</BUTTON>
					</DIV> }
				{ showGeolocator && <P>geolocator</P> }
				{ showForm && <P>Form</P> }
				
			</FORM> }
		</DIV>

	)
	
}

main.propTypes = {

	intl: intlShape.isRequired,

	uploadSupported: PropTypes.bool,

	showUpload: PropTypes.bool,
	showPrompts: PropTypes.bool,
	showStatuses: PropTypes.bool,
	showErrors: PropTypes.bool,
	showLocate: PropTypes.bool,
	showGeolocator: PropTypes.bool,
	showForm: PropTypes.bool,

	validateFile: PropTypes.func,
	locateCoast: PropTypes.func,
	uploadImage: PropTypes.func,
	resetForm: PropTypes.func,

	image: PropTypes.object,
	setMaterial: PropTypes.func,
	progress: PropTypes.number,
	
	

}

export default injectIntl( main )

/*<P>
					<small>( { formatMessage( messages.one_by_one ) } <A href="#" onClick={ ( ) => { } } >{ formatMessage( messages.check_for_batch_upload ) }</A> )</small>
				</P>
				<HR/>
				{ !_.isEmpty( image ) &&
					<IMG src={ image.dataURL } alt={ formatMessage( messages.img_alt ) } width={ 400 } />
				}
				<H priority={ 2 }>
					{ status && <SPAN>{ stat }</SPAN> }
					{ status == 'status_uploading' && <SPAN> { progress }%</SPAN> }
					{ status == 'status_location_undefined' && <P><BUTTON type="button" onClick={ locateCoast }>{ formatMessage( messages.yes_location_known ) }</BUTTON><BUTTON type="button" onClick={ resetForm }>{ formatMessage( messages.no_location_unknown ) }</BUTTON></P> }
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
				{ status == 'status_hurray' && <P><BUTTON onClick={ uploadImage }>{ formatMessage( messages.upload_image ) }</BUTTON></P> }*/
