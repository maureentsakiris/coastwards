import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import _ from 'underscore'

import TOGGLE from 'components/ui/toggle'
import H from 'components/tags/h'
import DIV from 'components/tags/div'
import P from 'components/tags/p'
// import IMG from 'components/tags/img'

import style from '_base'

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
	guideline_location_header:{
		id: "guideline_loacation_header",
		description: "Header - We need the location",
		defaultMessage: "We need to know the location of the coast"
	},
	guideline_location_text:{
		id: "guideline_location_text",
		description: "Guideline - Location",
		defaultMessage: "Unfortunately, this means: No images from Facebook or Whatsapp and probably most other social media. No scans. No screenshots.",
	},
	guideline_faces_header:{
		id: "guideline_faces_header",
		description: "Header - No faces",
		defaultMessage: "No faces"
	},
	guideline_faces_text:{
		id: "guideline_faces_text",
		description: "Guideline - Faces",
		defaultMessage: "For privacy concerns, we cannot accept images with faces. During validation we run the images through face detection to enforce this policy."
	},
	guideline_original_header:{
		id: "guideline_original_header",
		description: "Header - Material",
		defaultMessage: "We need the original image"
	},
	guideline_original_text:{
		id: "guideline_original_text",
		description: "Guideline - Material",
		defaultMessage: "...."
	},
	guideline_material_header:{
		id: "guideline_material_header",
		description: "Header - Material",
		defaultMessage: "We need to see the coast material"
	},
	guideline_material_text:{
		id: "guideline_material_text",
		description: "Guideline - Material",
		defaultMessage: "Ideally, the shoreline divides the image in two, so we can see the coast material and adaptation measures, if present."
	}

} )

const guidelines = ( { intl } ) => {

	const { formatMessage } = intl

	const glData = [

		{ img: 'location', header: formatMessage( messages.guideline_location_header ), text: formatMessage( messages.guideline_location_text ) },
		{ img: 'faces', header: formatMessage( messages.guideline_faces_header ), text: formatMessage( messages.guideline_faces_text ) },
		{ img: 'original', header: formatMessage( messages.guideline_original_header ), text: formatMessage( messages.guideline_original_text ) },
		{ img: 'material', header: formatMessage( messages.guideline_material_header ), text: formatMessage( messages.guideline_material_text ) }

	]

	const gls = _.map( glData, ( gl, key ) => {

		/*const img = 'assets/guidelines/' + gl.img + '.jpg'
		<IMG src={ img } alt={ gl.img } />

		<P>{ gl.text }</P>*/

		const header = ( key + 1 ) + ' - ' + gl.header

		return(

			<TOGGLE key={ key } title={ gl.header } priority={ 4 } text={ header } >
				<P>{ gl.text }</P>
			</TOGGLE>

		)

	} )

	return(

		<TOGGLE id="Guidelines" title={ formatMessage( messages.any_picture_title ) } priority={ 3 } text={ formatMessage( messages.any_picture ) } className={ style.corset } >
			<P>{ formatMessage( messages.any_coast ) }</P>
			<DIV>{ gls }</DIV>
		</TOGGLE>

	)

}

guidelines.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( guidelines ) 