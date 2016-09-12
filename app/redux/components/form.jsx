import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import H from 'components/tags/h'
import IMG from 'components/tags/img'
import FORM from 'components/tags/form'
import BUTTON from 'components/tags/button'
/*import TOGGLE from 'components/ui/toggle'*/

import RADIOGROUP from 'components/form/radiogroup/radiogroup'
import COMMENT from 'components/form/input/comment'
import HASHTAG from 'components/form/input/hashtag'

import BR from 'components/tags/br'

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
	help_more:{
		id: "help_more",
		description: "Header - Asks user to help even more by answering a few questions",
		defaultMessage: "One more question though – if we may"
	},
	help_even_more:{
		id: "help_even_more",
		description: "Header - Asks users to answer even more questions, if they feel like it",
		defaultMessage: "Want to help even more?"
	},
	


	//materials
	select_material:{
		id: "select_material",
		description: "Header - Asks user to describe the coast material",
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

	upload_image:{
		id: "upload_image",
		description: "Button label - Prompts the user to upload the image",
		defaultMessage: "UPLOAD"
	},
	cancel_upload:{
		id: "cancel_upload",
		description: "Button label - Cancel upload",
		defaultMessage: "CANCEL"
	},

	//adaptation
	select_adaptation:{
		id: "select_adaptation",
		description: "Header - Asks user to select one of the following adaptation measures",
		defaultMessage: "Can you see any of the following adaptation measures?"
	},


	//comment
	comment:{
		id: "comment",
		description: "Label - Comment",
		defaultMessage: "Say hello, leave us a not, tell us a story..."
	}, 
	placeholder_comment:{
		id: "placeholder_comment",
		description: "Placeholder - Prompts user to leave a comment like ... Hello world!",
		defaultMessage: "Hello world!"
	},

	//hashtag
	hashtag:{
		id: "hashtag",
		description: "Label - Hashtag",
		defaultMessage: "Hashtag your image! (So you can find it again)"
	},
	placeholder_hashtag:{
		id: "placeholder_hashtag",
		description: "Placeholder - ",
		defaultMessage: "#mycrazysummerwithgeorgie"
	}
	

} )

const form = ( { intl, show, image, setMaterial, /*setAdaptation,*/ setComment, setHashtag, uploadImage, resetMain } ) => {

	const { formatMessage } = intl

	const style = {

		display: show ? 'block' : 'none'

	}

	const materials = [

		{ label: formatMessage( messages.sand ), value: 'sand' },
		{ label: formatMessage( messages.pebble ), value: 'pebble' },
		{ label: formatMessage( messages.rock ), value: 'rock' },
		{ label: formatMessage( messages.mud ), value: 'mud' },
		{ label: formatMessage( messages.ice ), value: 'ice' },
		{ label: formatMessage( messages.manmade ), value: 'manmade' },
		{ label: formatMessage( messages.notsure ), value: 'notsure' }

	]

	/*const adaptations = [

		{ label: "!Dike", value: "dike" },
		{ label: "!Wave-breaker", value: "wavebreaker" }

	]*/

	return(

		<FORM id="Form" style={ style } action="#" >
			{ image.dataURL && <IMG src={ image.dataURL } alt="your image" /> }
			<H priority={ 2 }>{ formatMessage( messages.hurray ) }</H>
			<H priority={ 3 }>{ formatMessage( messages.help_more ) }</H>
			<RADIOGROUP form="Form" label={ formatMessage( messages.select_material ) } name="material" options={ materials } onClick={ setMaterial } />
			<BR/><BR/>
			<COMMENT form="Form" label={ formatMessage( messages.comment ) } name="comment" placeholder={ formatMessage( messages.placeholder_comment ) } onChange={ setComment } />
			<BR/><BR/>
			<HASHTAG form="Form" label={ formatMessage( messages.hashtag ) } name="hashtag" placeholder={ formatMessage( messages.placeholder_hashtag ) } onChange={ setHashtag } />
			<BR/><BR/>
			<BUTTON type="button" onClick={ resetMain } >{ formatMessage( messages.cancel_upload ) }</BUTTON>
			<BUTTON type="button" onClick={ uploadImage } >{ formatMessage( messages.upload_image ) }</BUTTON>
		</FORM>

	)
	
}

form.propTypes = {

	intl: intlShape.isRequired,

	show: PropTypes.bool,
	image: PropTypes.object,

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
