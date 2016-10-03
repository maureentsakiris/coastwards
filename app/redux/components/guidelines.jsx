import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import _ from 'underscore'

import TOGGLE from 'components/ui/toggle'
import DIV from 'components/tags/div'
import P from 'components/tags/p'
import H from 'components/tags/h'

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
		defaultMessage: "This means: No images from Facebook, Whatsapp or other Social Media and no scans or screenshots. Images from these sources do not have any metadata and we need the metadata to figure out where the coast is located and when the image was taken.",
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
	guideline_material_text:{
		id: "guideline_material_text",
		description: "Guideline - Material",
		defaultMessage: "You probably didn't care much about the coast material at the time you took the picture, so please bear in mind that we don't care about how beautiful (sunsets) or ugly (your toes!) the image is, as long as we can see the coast material."
	}

} )

const guidelines = ( { intl } ) => {

	const { formatMessage } = intl

	const glData = [

		{ img: 'original', header: formatMessage( messages.guideline_original_header ), text: formatMessage( messages.guideline_original_text ) },
		{ img: 'faces', header: formatMessage( messages.guideline_faces_header ), text: formatMessage( messages.guideline_faces_text ) },
		{ img: 'material', header: formatMessage( messages.guideline_material_header ), text: formatMessage( messages.guideline_material_text ) }

	]

	const gls = _.map( glData, ( gl, key ) => {

		/*const img = 'assets/guidelines/' + gl.img + '.jpg'
		<IMG src={ img } alt={ gl.img } />

		<P>{ gl.text }</P>*/


		return(

			<DIV key={ key } >
				<H priority={ 4 } >{ gl.header }</H>
				<P>{ gl.text }</P>
			</DIV>

		)

	} )

	return(

		<TOGGLE id="Guidelines" title={ formatMessage( messages.any_picture_title ) } priority={ 3 } text={ formatMessage( messages.any_picture ) } className={ style.toggle } >
			<P>{ formatMessage( messages.any_coast ) }</P>
			<DIV>{ gls }</DIV>
		</TOGGLE>

	)

}

guidelines.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( guidelines ) 