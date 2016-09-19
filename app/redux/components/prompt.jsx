import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import H from 'components/tags/h'
import DIV from 'components/tags/div'
import SMALL from 'components/tags/small'
import A from 'components/tags/a'

import style from './_headers.scss'

const messages = defineMessages( {

	pictures_on_device:{
		id: "pictures_on_device",
		description: "Section header - All set?",
		defaultMessage: "Do you have any pictures of coasts on your device?"
	},
	why_not_now:{
		id: "why_not_now",
		description: "Section header",
		defaultMessage: "Why not upload them now?"
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

const prompt = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<DIV id="Prompt" className={ style.corset } >
			<H priority={ 2 } className={ style.center } >{ formatMessage( messages.pictures_on_device ) } { formatMessage( messages.why_not_now ) }</H>
			<SMALL className={ style.center } >( { formatMessage( messages.one_by_one ) } <A href="#" onClick={ ( ) => { } } >{ formatMessage( messages.check_for_batch_upload ) }</A> )</SMALL>
		</DIV>

	)
	
}

prompt.propTypes = {

	intl: intlShape.isRequired,

	uploadSupported: PropTypes.bool
	
}

export default injectIntl( prompt )

