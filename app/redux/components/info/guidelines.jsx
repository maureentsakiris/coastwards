import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

//import TOGGLE from 'components/ui/toggle'
import P from 'components/tags/p'
import H from 'components/tags/h'
import A from 'components/tags/a'
import OL from 'components/tags/ol'
import LI from 'components/tags/li'
import IMG from 'components/tags/img'
import DIV from 'components/tags/div'

import style from './_guidelines'

const messages = defineMessages( { 

	any_picture:{
		id: "any_picture",
		description: "Section header - Just any picture?",
		defaultMessage: "Just any picture?"
	},
	/*any_picture_title:{
		id: "any_picture_title",
		description: "Section header title - Some quick guidelines",
		defaultMessage: "Some quick guidelines"
	},*/
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
		defaultMessage: "We honestly don't care about how beautiful (sunsets) or ugly (your toes!) the image is, as long as we can see the coast material."
	},
	guideline_coasts_header:{
		id: "guideline_coasts_header",
		description: "Header",
		defaultMessage: "Coasts are not only beaches!"
	},
	guideline_coasts_text:{
		id: "guideline_coasts_text",
		description: "Guideline - Coasts",
		defaultMessage: "Harbors, cliffs, promenades alongside the water ... anything that touches the oceans and seas."
	},
	guidelines_and:{
		id: "guidelines_and",
		description: " - ",
		defaultMessage: "and"
	},
	guideline_closer_header:{
		id: "guideline_closer_header",
		description: "Header - ",
		defaultMessage: "The closer, the BETTER!"
	}

} )

const guidelines = ( { intl, jazzSupported, showDialog } ) => {

	const { formatMessage } = intl

	if( !jazzSupported ){


		return(

			<DIV id="Guidelines" className={ style.noJazz } >
				<H priority={ 3 } >{ formatMessage( messages.any_picture ) }</H>
				<P>{ formatMessage( messages.any_coast ) }</P>
				<OL>
					<LI>
						<H priority={ 4 } >{ formatMessage( messages.guideline_original_header ) }</H>
						<P>{ formatMessage( messages.guideline_original_text ) }</P>
					</LI>
					<LI>
						<H priority={ 4 } >{ formatMessage( messages.guideline_faces_header ) }</H>
						<P>{ formatMessage( messages.guideline_faces_text ) }</P>
					</LI>
					<LI>
						<H priority={ 4 } >{ formatMessage( messages.guideline_material_header ) }</H>
						<P>{ formatMessage( messages.guideline_material_text ) } <A onClick={ showDialog.bind( this, 'DEFINEMATERIAL' ) }>{ formatMessage( messages.guideline_material_help ) }</A></P>
					</LI>
					<LI>
						<H priority={ 4 } >{ formatMessage( messages.guideline_coasts_header ) }</H>
						<P>{ formatMessage( messages.guideline_coasts_text ) }</P>
					</LI>
				</OL>
			</DIV>

		)


	}else{

		/*style={ { backgroundImage: "url(assets/guidelines/guidelines-bg.png)" } }*/
		/*<IMG src="assets/guidelines/popup.png" alt="Popup" />*/
		//<A className={ style.read } >{ formatMessage( messages.any_picture_title ) }</A>
		//<H priority={ 4 } >{ formatMessage( messages.any_picture_title ) }</H>

		return(

			<DIV className={ style.guidelines } >
				<DIV className={ style.box } >
					<H priority={ 3 } >{ formatMessage( messages.any_picture ) }</H>
					<P className={ style.intro } >{ formatMessage( messages.any_coast ) }</P>
				</DIV>
				<OL className={ style.list } >
					<LI className={ style.guideline } >
						<IMG src="assets/guidelines/original.svg" alt={ formatMessage( messages.guideline_original_header ) } />
						<DIV>
							<H priority={ 4 } >{ formatMessage( messages.guideline_original_header ) }</H>
							<P>{ formatMessage( messages.guideline_original_text ) }</P>
						</DIV>
					</LI>
					<LI className={ style.guideline } >
						<IMG src="assets/guidelines/faces.svg" alt={ formatMessage( messages.guideline_faces_header ) } />
						<DIV>
							<H priority={ 4 } >{ formatMessage( messages.guideline_faces_header ) }</H>
							<P>{ formatMessage( messages.guideline_faces_text ) }</P>
						</DIV>
					</LI>
					<LI className={ style.guideline } >
						<IMG src="assets/guidelines/material.svg" alt={ formatMessage( messages.guideline_material_header ) } />
						<DIV>
							<H priority={ 4 } >{ formatMessage( messages.guideline_material_header ) }</H>
							<P>{ formatMessage( messages.guideline_material_text ) } <A onClick={ showDialog.bind( this, 'DEFINEMATERIAL' ) }>{ formatMessage( messages.guideline_material_help ) }</A></P>
						</DIV>
					</LI>
					<LI className={ style.guideline } >
						<IMG src="assets/guidelines/harbor.svg" alt={ formatMessage( messages.guideline_coasts_header ) } />
						<DIV>
							<H priority={ 4 } >{ formatMessage( messages.guideline_coasts_header ) }</H>
							<P>{ formatMessage( messages.guideline_coasts_text ) }</P>
						</DIV>
					</LI>
					<LI className={ style.guideline } >
						<DIV>
							<H priority={ 4 } >{ formatMessage( messages.guideline_closer_header ) }</H>
						</DIV>
					</LI>
				</OL>
			</DIV>

		)


	}

}

guidelines.propTypes = {

	intl: intlShape.isRequired,
	jazzSupported: PropTypes.bool,

	showDialog: PropTypes.func

}

export default injectIntl( guidelines ) 

/*<TOGGLE id="Guidelines" title={ formatMessage( messages.any_picture_title ) } priority={ 3 } text={ formatMessage( messages.any_picture ) } className={ style.toggle } >
				<P>{ formatMessage( messages.any_coast ) }</P>
				<OL className={ style.guidelines } >
					<LI className={ style.guideline } >
						<IMG src="assets/guidelines/original.svg" alt={ formatMessage( messages.guideline_original_header ) } />
						<DIV>
							<H priority={ 4 } >{ formatMessage( messages.guideline_original_header ) }</H>
							<P>{ formatMessage( messages.guideline_original_text ) }</P>
						</DIV>
					</LI>
					<LI className={ style.guideline } >
						<IMG src="assets/guidelines/faces.svg" alt={ formatMessage( messages.guideline_faces_header ) } />
						<DIV>
							<H priority={ 4 } >{ formatMessage( messages.guideline_faces_header ) }</H>
							<P>{ formatMessage( messages.guideline_faces_text ) }</P>
						</DIV>
					</LI>
					<LI className={ style.guideline } >
						<IMG src="assets/guidelines/material.svg" alt={ formatMessage( messages.guideline_material_header ) } />
						<DIV>
							<H priority={ 4 } >{ formatMessage( messages.guideline_material_header ) }</H>
							<P>{ formatMessage( messages.guideline_material_text ) } <A onClick={ showDialog.bind( this, 'DEFINEMATERIAL' ) }>{ formatMessage( messages.guideline_material_help ) }</A></P>
						</DIV>
					</LI>
					<LI className={ style.guideline } >
						<IMG src="assets/guidelines/harbor.svg" alt={ formatMessage( messages.guideline_coasts_header ) } />
						<DIV>
							<H priority={ 4 } >{ formatMessage( messages.guideline_coasts_header ) }</H>
							<P>{ formatMessage( messages.guideline_coasts_text ) }</P>
						</DIV>
					</LI>
				</OL>
				<H priority={ 4 } className={ style.and } >{ formatMessage( messages.guidelines_and ) }</H>
				<H priority={ 4 } className={ style.closer }>{ formatMessage( messages.guideline_closer_header ) }</H>
			</TOGGLE>*/