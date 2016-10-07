import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import FORMDATA from 'containers/formdata'

import H from 'components/tags/h'
import IMG from 'components/tags/img'
import FORM from 'components/tags/form'
import DIV from 'components/tags/div'

import RADIOGROUP from 'components/form/radiogroup/radiogroup'
import COMMENT from 'components/form/input/comment'
import HASHTAG from 'components/form/input/hashtag'
import CANCEL from 'components/form/button/cancel'
import GO from 'components/form/button/go'

import BR from 'components/tags/br'

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
		defaultMessage: "AWESOME! Your image passed all the tests and is ready for upload!"
	},


	//materials
	select_material:{
		id: "select_material",
		description: "Header - Asks user to help even more by answering a few questions",
		defaultMessage: "How would you describe the coast material?"
	},
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

	//comment
	say_hello:{
		id: "say_hello",
		description: "Header - Prompts user to leave a comment",
		defaultMessage: "Say hello, leave us a note, tell us the story of your coast..."
	},
	placeholder_say_hello:{
		id: "placeholder_say_hello",
		description: "Placeholder - Prompts user to leave a comment like ... Hello world!",
		defaultMessage: "Hello world!"
	},

	//hashtag
	hashtag_your_image:{
		id: "hashtag_your_image",
		description: "Header - Prompts user to hashtag the image",
		defaultMessage: "Give your image a hashtag!"
	},
	placeholder_hashtag_your_image:{
		id: "placeholder_hashtag_your_image",
		description: "Placeholder - ",
		defaultMessage: "#iwashere"
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

const form = ( { intl, className, show, image, jazzSupported, setMaterial, /*setAdaptation,*/ setComment, setHashtag, uploadImage, resetMain } ) => {

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


	if( jazzSupported ){

		const cls = Classnames( className, style.formJazz, {

			[ style.showJazz ]: show

		} )

		return(

			<FORM id="Form" action="#" className={ cls } >
				<DIV id="Sheet" className={ style.sheet } >
					{ image.dataURL && <DIV className={ style.image } style={ { backgroundImage: 'url(' + image.dataURL + ')' } } ></DIV> }
					<DIV id="Content" className={ style.content } >
						<H priority={ 2 }>{ formatMessage( messages.hurray ) }</H>
						<RADIOGROUP form="Form" label={ formatMessage( messages.select_material ) } name="material" options={ materials } onClick={ setMaterial } preferPlaceholder={ false } />
						<COMMENT form="Form" label={ formatMessage( messages.say_hello ) } name="comment" placeholder={ formatMessage( messages.placeholder_say_hello ) } onChange={ setComment } preferPlaceholder={ false } />
						<HASHTAG form="Form" label={ formatMessage( messages.hashtag_your_image ) } name="hashtag" placeholder={ formatMessage( messages.placeholder_hashtag_your_image ) } onChange={ setHashtag } preferPlaceholder={ false } />
						<FORMDATA />
					</DIV>
					<DIV id="Actions" className={ style.actions } >
						<CANCEL className={ style.cancel } onClick={ resetMain } label={ formatMessage( messages.cancel_upload ) } />
						<GO onClick={ uploadImage } label={ formatMessage( messages.upload_image ) } />
					</DIV>
				</DIV>
			</FORM>

		)

	}else{

		const cls = Classnames( className, style.form, {

			[ style.show ]: show

		} )

		return(

			<FORM id="Form" action="#" className={ cls } >
				<H priority={ 2 }>{ formatMessage( messages.hurray ) }</H>
				{ image.dataURL && <IMG src={ image.dataURL } alt="your image" /> }
				<BR/><BR/>
				<RADIOGROUP form="Form" label={ formatMessage( messages.select_material ) } name="material" options={ materials } onClick={ setMaterial } preferPlaceholder={ false } />
				<BR/>
				<COMMENT form="Form" label={ formatMessage( messages.say_hello ) } name="comment" placeholder={ formatMessage( messages.placeholder_say_hello ) } onChange={ setComment } preferPlaceholder={ false } />
				<BR/>
				<HASHTAG form="Form" label={ formatMessage( messages.hashtag_your_image ) } name="hashtag" placeholder={ formatMessage( messages.placeholder_hashtag_your_image ) } onChange={ setHashtag } preferPlaceholder={ false } />
				<BR/><BR/>
				<FORMDATA />
				<BR/><BR/>
				<CANCEL className={ style.cancel } onClick={ resetMain } label={ formatMessage( messages.cancel_upload ) } />
				<GO onClick={ uploadImage } label={ formatMessage( messages.upload_image ) } />
				<BR/><BR/>
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
	/*setAdaptation: PropTypes.func,*/
	setComment: PropTypes.func,
	setHashtag: PropTypes.func,

	uploadImage: PropTypes.func,
	resetMain: PropTypes.func

}

export default injectIntl( form )

/*<TOGGLE priority={ 5 } text={ formatMessage( messages.help_even_more ) } >
				<RADIOGROUP form="Form" label={ formatMessage( messages.select_adaptation ) } name="adaptation" options={ adaptations } onClick={ setAdaptation } />
			</TOGGLE>*/
