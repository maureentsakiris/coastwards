import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import SPAN from 'components/tags/span'
import A from 'components/tags/a'

import CLOSE from 'components/ui/close'


import style from './_prompts'


const messages = defineMessages( {

	select_file:{
		id: "select_file",
		description: "Prompt - Prompts user to select a file through the file system",
		defaultMessage: "Help us draw this map of coasts!"
	},
	upload_ok:{
		id: "upload_ok",
		description: "Status - Informs user that his image was uploaded successfully",
		defaultMessage: "WOHOO! Nice one! Your image was uploaded. Next one! :)"
	},

	upload_image_prompt:{
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
	}


} )

const prompts = ( { intl, className, prompt, jazzSupported, show, hide, openInput, showDialog } ) => {

	const { formatMessage } = intl

	const str = messages[ prompt ] ? formatMessage( messages[ prompt ] ) : prompt

	const cls = Classnames( className, style.prompts, {

		[ style.show ]: show

	} )

	return(

		<DIV id="Prompts" className={ cls } >
			<H priority={ 2 }>{ str }
			{ jazzSupported && <SPAN> <A href="#" onClick={ openInput } title={ formatMessage( messages.upload_image_prompt_title ) } >{ formatMessage( messages.upload_image_prompt ) }</A> { formatMessage( messages.or ) } <A href="#" onClick={ showDialog.bind( this, 'SHARE' ) } title={ formatMessage( messages.tell_friend_title ) }>{ formatMessage( messages.tell_friend ) }</A>. <CLOSE onClick={ hide } title={ formatMessage( messages.just_browse ) } /></SPAN> } 
			</H>
		</DIV>

	)
	
}

prompts.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,
	
	prompt: PropTypes.string,
	jazzSupported: PropTypes.bool,
	show: PropTypes.bool,

	hide: PropTypes.func,
	openInput: PropTypes.func,
	showDialog: PropTypes.func

}

export default injectIntl( prompts )
