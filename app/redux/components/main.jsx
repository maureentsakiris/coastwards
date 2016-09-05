import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import Errors from 'containers/errors'
import Statuses from 'containers/statuses'
import Prompts from 'containers/prompts'
import Upload from 'containers/upload'
import Locate from 'containers/locate'
import Geolocator from 'containers/geolocator'
import Form from 'containers/form'

import H from 'components/tags/h'
import DIV from 'components/tags/div'
import SMALL from 'components/tags/small'
import A from 'components/tags/a'
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
	}

} )

const main = ( { intl, uploadSupported } ) => {

	const { formatMessage } = intl

	if( !uploadSupported ){

		return(

			<DIV id="Main" >
				<H priority={ 2 }>{ formatMessage( messages.all_set ) }</H>
				<p>{ formatMessage( messages.unsupported ) }</p>
			</DIV>

		)

	}else{

		return(

			<DIV id="Main" >
				<H priority={ 2 }>{ formatMessage( messages.all_set ) }</H>
				<SMALL>( { formatMessage( messages.one_by_one ) } <A href="#" onClick={ ( ) => { } } >{ formatMessage( messages.check_for_batch_upload ) }</A> )</SMALL>
				<HR/>
				<Prompts />
				<Errors /> 
				<Statuses />
				<Upload />
				<Locate />
				<Geolocator />
				<Form />
			</DIV>

		)

	}
	
}

main.propTypes = {

	intl: intlShape.isRequired,

	uploadSupported: PropTypes.bool
	
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
