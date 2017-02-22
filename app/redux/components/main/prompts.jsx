import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import ACTIONS from 'containers/main/actions'

import DIV from 'components/tags/div'
import H from 'components/tags/h'


import style from './_prompts'


const messages = defineMessages( {

	select_file:{
		id: "select_file",
		description: "Prompt - Prompts user to select a file through the file system",
		defaultMessage: "Have any pictures of coasts? Why not upload them now?"
	},
	upload_ok:{
		id: "upload_ok",
		description: "Status - Informs user that his image was uploaded successfully",
		defaultMessage: "WOHOO! Nice one! Your image was uploaded. Next one! :)"
	},

	/*upload_image_prompt:{
		id: "upload_image_prompt",
		description: "Prompt - ",
		defaultMessage: "Upload an image"
	},
	upload_image_prompt_title:{
		id: "upload_image_prompt_title",
		description: "Title - ",
		defaultMessage: "Choose an image from your device"
	},
	or:{
		id: "or",
		description: "Prompt - ",
		defaultMessage: "or"
	},
	tell_friend:{
		id: "tell_friend",
		description: "Prompt - ",
		defaultMessage: "tell a friend"
	},
	tell_friend_title:{
		id: "tell_friend_title",
		description: " - ",
		defaultMessage: "Share this website with friends and family"
	},
	just_browse:{
		id: "just_browse",
		description: "Prompt - ",
		defaultMessage: "Just browse"
	},*/

	uploadBtn_title:{
		id: "uploadBtn_title",
		description: "Title - ",
		defaultMessage: "Upload an image"
	},
	uploadBtn_label:{
		id: "uploadBtn_label",
		description: "Label - ",
		defaultMessage: "Upload"
	},
	browseBtn_title:{
		id: "browseBtn_title",
		description: "Title - ",
		defaultMessage: "Browse the map"
	},
	browseBtn_label:{
		id: "browseBtn_label",
		description: "Label - ",
		defaultMessage: "Browse"
	},
	shareBtn_title:{
		id: "shareBtn_title",
		description: "Title - ",
		defaultMessage: "Tell a friend"
	},
	shareBtn_label:{
		id: "shareBtn_label",
		description: "Label - ",
		defaultMessage: "Share"
	}
	
} )

const prompts = ( { intl, className, prompt, jazzSupported, show } ) => {

	const { formatMessage } = intl

	const str = messages[ prompt ] ? formatMessage( messages[ prompt ] ) : prompt

	const cls = Classnames( className, style.prompts, {

		[ style.show ]: show

	} )

	if( !jazzSupported ){

		return(

			<DIV id="Prompts" className={ cls } >
				<H priority={ 2 }>{ str }</H>
			</DIV>

		)

	}else{

		return(

			<DIV id="Prompts" className={ cls } >
				<H priority={ 2 }>{ str }</H>
				<ACTIONS />
			</DIV>

		)

	}
	
}

prompts.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,
	
	prompt: PropTypes.string,
	jazzSupported: PropTypes.bool,
	show: PropTypes.bool

}

export default injectIntl( prompts )
