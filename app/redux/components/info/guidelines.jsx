import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import _ from 'underscore'

import TOGGLE from 'components/ui/toggle'
import DIV from 'components/tags/div'
import P from 'components/tags/p'
import H from 'components/tags/h'
import SPAN from 'components/tags/span'
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
		defaultMessage: "What is the coast made of?"
	},
	guideline_material_text:{
		id: "guideline_material_text",
		description: "Guideline - Material",
		defaultMessage: "You probably didn't care much about the coast material at the time you took the picture, so please bear in mind that we don't care about how beautiful (sunsets) or ugly (your toes!) the image is, as long as we can see what stuff the coast is made of (e.g. sand, rock ...)"
	},
	guideline_coasts_header:{
		id: "guideline_coasts_header",
		description: "Header",
		defaultMessage: "Oh and: Coasts are not only beaches!"
	}

} )

const guidelines = ( { intl/*, jazzSupported*/ } ) => {

	const { formatMessage } = intl

	const glData = [

		{ header: formatMessage( messages.guideline_original_header ), text: formatMessage( messages.guideline_original_text ), img: 'assets/original.svg', alt: 'No facebook, twitter, whatsapp etc' },
		{ header: formatMessage( messages.guideline_faces_header ), text: formatMessage( messages.guideline_faces_text ), img: 'assets/faces.svg', alt: 'No faces' },
		{ header: formatMessage( messages.guideline_material_header ), text: formatMessage( messages.guideline_material_text ), img: 'assets/material.svg', alt: 'Coast material' },
		{ header: formatMessage( messages.guideline_coasts_header ), text: '', img: 'assets/coasts.svg', alt: 'Coasts are not only beaches' }

	]

	const gls = _.map( glData, ( gl, key ) => {

		const { header, text/*, img, alt*/ } = gl

		const number = key + 1;

		return(

			<DIV key={ key } className={ style.guideline } >
				<DIV>
					<H priority={ 4 } ><SPAN>0{ number }</SPAN> { header }</H>
					{ text && <P>{ text }</P> }
				</DIV>
			</DIV>

		)

		/*if( !jazzSupported ){

			return(

				<DIV key={ key } className={ style.guideline } >
					<DIV>
						<H priority={ 4 } ><SPAN>0{ number }</SPAN> { header }</H>
						<P>{ text }</P>
					</DIV>
				</DIV>

			)


		}else{

			return(

				<DIV key={ key } className={ style.guidelineJazz } >
					<IMG src={ img } alt={ alt } />
					<DIV>
						<H priority={ 4 } ><SPAN>0{ number }</SPAN> { header }</H>
						<P>{ text }</P>
					</DIV>
				</DIV>

			)

		}*/

	} )

	return(

		<TOGGLE id="Guidelines" title={ formatMessage( messages.any_picture_title ) } priority={ 3 } text={ formatMessage( messages.any_picture ) } className={ style.toggle } >
			<P><STRONG>{ formatMessage( messages.any_coast ) }</STRONG></P>
			<DIV>{ gls }</DIV>
		</TOGGLE>

	)

}

guidelines.propTypes = {

	intl: intlShape.isRequired,
	jazzSupported: PropTypes.bool

}

export default injectIntl( guidelines ) 