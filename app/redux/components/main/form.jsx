import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import FORMDATA from 'containers/main/formdata'

import H from 'components/tags/h'
import IMG from 'components/tags/img'
import FORM from 'components/tags/form'
import DIV from 'components/tags/div'
import A from 'components/tags/a'

import RADIOGROUP from 'components/form/radiogroup/radiogroup'
import CANCEL from 'components/form/button/cancel'
import GO from 'components/form/button/go'

import BR from 'components/tags/br'
import SMALL from 'components/tags/small'

import style from './_form'


const messages = defineMessages( {

	img_alt: {
		id: "img_alt",
		description: "Alt - Alternative description of the uploaded image",
		defaultMessage: "Your image"
	},
	hurray:{
		id: "hurray",
		description: "Header - Informs user that his or her image has passed all the tests and is now ready for upload",
		defaultMessage: "Your image is ready for upload! Just one more question ..."
	},


	//materials
	select_material:{
		id: "select_material",
		description: "Header - Asks user to help even more by answering a few questions",
		defaultMessage: "How would you describe the coast material?"
	},
	define_material:{
		id: "define_material",
		description: "Anchor - ",
		defaultMessage: "(What do you mean by coast material?)"
	},

	//materials <--> popup.jsx
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

	//upload
	upload_image:{
		id: "upload_image",
		description: "Button label - Prompts the user to upload the image",
		defaultMessage: "UPLOAD"
	},
	cancel_upload:{
		id: "cancel_upload",
		description: "Button label - Cancel upload",
		defaultMessage: "CANCEL"
	}

} )

const form = ( { intl, className, show, image, jazzSupported, setMaterial, uploadImage, resetMain, showDialog } ) => {

	const { formatMessage } = intl


	const materials = [

		{ label: formatMessage( messages.sand ), value: 'sand' },
		{ label: formatMessage( messages.pebble ), value: 'pebble' },
		{ label: formatMessage( messages.rock ), value: 'rock' },
		{ label: formatMessage( messages.mud ), value: 'mud' },
		{ label: formatMessage( messages.ice ), value: 'ice' },
		{ label: formatMessage( messages.manmade ), value: 'manmade' },
		{ label: formatMessage( messages.notsure ), value: 'notsure' }

	]


	if( !jazzSupported ){

		const cls = Classnames( className, style.form, {

			[ style.show ]: show

		} )

		return(

			<FORM id="Form" action="#" className={ cls } >
				{ image.dataURL && <IMG src={ image.dataURL } alt={ formatMessage( messages.img_alt ) } /> }
				<H priority={ 2 }>{ formatMessage( messages.hurray ) }</H>
				<RADIOGROUP form="Form" label={ formatMessage( messages.select_material ) } name="material" options={ materials } onClick={ setMaterial } preferPlaceholder={ false } >
					{ " " }<SMALL><A onClick={ showDialog.bind( this, 'DEFINEMATERIAL' ) }>{ formatMessage( messages.define_material ) }</A></SMALL>
				</RADIOGROUP>
				<BR/><BR/>
				<FORMDATA />
				<BR/><BR/>
				<CANCEL className={ style.cancel } onClick={ resetMain } label={ formatMessage( messages.cancel_upload ) } />
				<GO onClick={ uploadImage } label={ formatMessage( messages.upload_image ) } />
				<BR/><BR/>
			</FORM>

		)

	}else{

		const cls = Classnames( className, style.formJazz, {

			[ style.showJazz ]: show

		} )

		return(

			<FORM id="Form" action="#" className={ cls } >
				<DIV>
					<DIV id="Sheet" className={ style.sheet } >
						{ image.dataURL && <DIV className={ style.image } style={ { backgroundImage: 'url(' + image.dataURL + ')' } } ></DIV> }
						<DIV id="Content" className={ style.content } >
							<H priority={ 2 }>{ formatMessage( messages.hurray ) }</H>
							<RADIOGROUP form="Form" label={ formatMessage( messages.select_material ) } name="material" options={ materials } onClick={ setMaterial } preferPlaceholder={ false } className={ style.radiogroup } >
								{ " " }<SMALL><A onClick={ showDialog.bind( this, 'DEFINEMATERIAL' ) }>{ formatMessage( messages.define_material ) }</A></SMALL>
							</RADIOGROUP>
							<FORMDATA />
						</DIV>
					</DIV>
					<DIV className={ style.actions } >
						<CANCEL className={ style.cancel } onClick={ resetMain } label={ formatMessage( messages.cancel_upload ) } />
						<GO onClick={ uploadImage } label={ formatMessage( messages.upload_image ) } />
					</DIV>
				</DIV>
			</FORM>

		)

	}
	
}

form.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,

	show: PropTypes.bool,
	image: PropTypes.object,
	jazzSupported: PropTypes.bool,

	setMaterial: PropTypes.func,
	uploadImage: PropTypes.func,
	resetMain: PropTypes.func,
	showDialog: PropTypes.func

}

export default injectIntl( form )
