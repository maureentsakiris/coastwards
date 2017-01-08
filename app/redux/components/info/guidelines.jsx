import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import DIV from 'components/tags/div'
import P from 'components/tags/p'
import H from 'components/tags/h'
import SMALL from 'components/tags/small'
import A from 'components/tags/a'
/*import IMG from 'components/tags/img'*/
import STRONG from 'components/tags/strong'

import style from './_guidelines'

const messages = defineMessages( { 

	any_picture:{
		id: "any_picture",
		description: "Section header - Just any picture?",
		defaultMessage: "Just any picture?"
	},
	any_picture_title:{
		id: "any_picture_title",
		description: "Section header title - Some quick guidelines",
		defaultMessage: "Some quick guidelines"
	},
	any_coast:{
		id: "any_coast",
		description: "Header - ",
		defaultMessage: "Any coast but not any picture. We need these pictures to get a closer look at coasts (not people) and we need to know where these coasts are. So these are our guidelines:",
	},

	//guidelines
	guideline_original_header:{
		id: "guideline_original_header",
		description: "Header - We need the original image",
		defaultMessage: "We need the original image"
	},
	guideline_original_text:{
		id: "guideline_original_text",
		description: "Guideline - Original",
		defaultMessage: "This means: No images from Facebook, Whatsapp or other Social Media and no scans or screenshots.",
	},
	guideline_faces_header:{
		id: "guideline_faces_header",
		description: "Header - No faces",
		defaultMessage: "No faces"
	},
	guideline_faces_text:{
		id: "guideline_faces_text",
		description: "Guideline - Faces",
		defaultMessage: "That's a no-go for data privacy reasons."
	},
	guideline_material_header:{
		id: "guideline_material_header",
		description: "Header - Material",
		defaultMessage: "We need to see the coast material"
	},
	guideline_material_help:{
		id: "guideline_material_help",
		description: "Header - help",
		defaultMessage: "(What do you mean by coast material?)"
	},
	guideline_material_text:{
		id: "guideline_material_text",
		description: "Guideline - Material",
		defaultMessage: "You probably didn't care much about the coast material at the time you took the picture, so please bear in mind that we don't care about how beautiful (sunsets) or ugly (your toes!) the image is, as long as we can see what the coast is made of."
	},
	guideline_coasts_header:{
		id: "guideline_coasts_header",
		description: "Header",
		defaultMessage: "Oh and: Coasts are not only beaches!"
	}

} )

const guidelines = ( { intl, showDialog } ) => {

	const { formatMessage } = intl

	return(

		<TOGGLE id="Guidelines" title={ formatMessage( messages.any_picture_title ) } priority={ 3 } text={ formatMessage( messages.any_picture ) } className={ style.toggle } >
			<P><STRONG>{ formatMessage( messages.any_coast ) }</STRONG></P>
			<DIV>
				<DIV className={ style.guideline } >
					<H priority={ 4 } >{ formatMessage( messages.guideline_original_header ) }</H>
					<P>{ formatMessage( messages.guideline_original_text ) }</P>
				</DIV>
				<DIV className={ style.guideline } >
					<H priority={ 4 } >{ formatMessage( messages.guideline_faces_header ) }</H>
					<P>{ formatMessage( messages.guideline_faces_text ) }</P>
				</DIV>
				<DIV className={ style.guideline } >
					<H priority={ 4 } >{ formatMessage( messages.guideline_material_header ) } <SMALL><A onClick={ showDialog.bind( this, 'DEFINEMATERIAL' ) }>{ formatMessage( messages.guideline_material_help ) }</A></SMALL></H>
					<P>{ formatMessage( messages.guideline_material_text ) }</P>
				</DIV>
				<DIV className={ style.guideline } >
					<H priority={ 4 } >{ formatMessage( messages.guideline_coasts_header ) }</H>
				</DIV>
			</DIV>
		</TOGGLE>

	)

}

guidelines.propTypes = {

	intl: intlShape.isRequired,
	jazzSupported: PropTypes.bool,

	showDialog: PropTypes.func

}

export default injectIntl( guidelines ) 