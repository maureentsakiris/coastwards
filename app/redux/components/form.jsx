import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import _ from 'underscore'

import H from 'components/tags/h'
import IMG from 'components/tags/img'
import FORM from 'components/tags/form'
import TABLE from 'components/tags/table'
import THEAD from 'components/tags/thead'
import TBODY from 'components/tags/tbody'
import TH from 'components/tags/th'
import TR from 'components/tags/tr'
import TD from 'components/tags/td'

import TOGGLE from 'components/ui/toggle'

import RADIOGROUP from 'components/form/radiogroup/radiogroup'
import COMMENT from 'components/form/input/comment'
import HASHTAG from 'components/form/input/hashtag'
import CANCEL from 'components/form/button/cancel'
import GO from 'components/form/button/go'

import BR from 'components/tags/br'

import cls from './_form.scss'

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
		defaultMessage: "#mycrazysummerwithgeorgie"
	},

	//privacy
	data_privacy:{
		id: "data_privacy",
		description: "Header - Gives user the opportunity to see exactly what information is beind sent to our servers",
		defaultMessage: "See what other information will be sent to our servers"
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
	},
	

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



	const exifTable = _.map( image.exifdata, ( exif, key ) => {

		const data = exif.toString()

		return(

			<TR key={ key }>
				<TD>{ key }</TD>
				<TD>{ data }</TD>
			</TR>

		)

	} )


	const labelsTable = _.map( image.labels, ( label, key ) => {

		return(

			<TR key={ key }>
				<TD>{ label.description }</TD>
				<TD>{ label.score }</TD>
			</TR>

		)

	} )

	/*const adaptations = [

		{ label: "!Dike", value: "dike" },
		{ label: "!Wave-breaker", value: "wavebreaker" }

	]*/

	return(

		<FORM id="Form" style={ style } action="#" >
			<H priority={ 2 }>{ formatMessage( messages.hurray ) }</H>
			{ image.dataURL && <IMG src={ image.dataURL } alt="your image" /> }
			<BR/><BR/>
			<RADIOGROUP form="Form" label={ formatMessage( messages.select_material ) } name="material" options={ materials } onClick={ setMaterial } />
			<BR/>
			<COMMENT form="Form" label={ formatMessage( messages.say_hello ) } name="comment" placeholder={ formatMessage( messages.placeholder_say_hello ) } onChange={ setComment } />
			<BR/>
			<HASHTAG form="Form" label={ formatMessage( messages.hashtag_your_image ) } name="hashtag" placeholder={ formatMessage( messages.placeholder_hashtag_your_image ) } onChange={ setHashtag } />
			<TOGGLE priority={ 6 } text={ formatMessage( messages.data_privacy ).toUpperCase() } >
				<TABLE className={ cls.table } >
					<THEAD>
						<TR>
							<TH>Image</TH>
							<TH></TH>
						</TR>
					</THEAD>
					<TBODY>
						<TR>
							<TD>Image</TD>
							<TD>We save the image at 800 pixels width and give it a new unique filename</TD>
						</TR>
					</TBODY>
					<THEAD>
						<TR>
							<TH>Labels</TH>
							<TH>Score</TH>
						</TR>
					</THEAD>
					<TBODY>
						{ labelsTable }
					</TBODY>
					<THEAD>
						<TR>
							<TH>Exifdata</TH>
							<TH>Value</TH>
						</TR>
					</THEAD>
					<TBODY>
						{ exifTable }
					</TBODY>
				</TABLE>
			</TOGGLE>
			<BR/><BR/>
			<CANCEL onClick={ resetMain } label={ formatMessage( messages.cancel_upload ) } />
			<GO onClick={ uploadImage } label={ formatMessage( messages.upload_image ) } />
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
