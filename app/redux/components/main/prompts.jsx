import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
//import P from 'components/tags/p'
import SPAN from 'components/tags/span'
import A from 'components/tags/a'
import BR from 'components/tags/br'
/*import BUTTON from 'components/tags/button'
import I from 'components/tags/i'
import P from 'components/tags/p'*/

import CLOSE from 'components/ui/close'


import style from './_prompts'


const messages = defineMessages( {

	select_file:{
		id: "select_file",
		description: "Prompt - Prompts user to select a file through the file system",
		defaultMessage: "Help us draw this map of coasts!"
	},
	select_help:{
		id: "select_help",
		description: "	 - ",
		defaultMessage: "Click the big blue button or drag and drop your images anywhere onto the world map"
	},
	upload_ok:{
		id: "upload_ok",
		description: "Status - Informs user that his image was uploaded successfully",
		defaultMessage: "WOHOO! Nice one! Your image was uploaded. Next one! :)"
	},

	upload_image:{
		id: "upload_image",
		description: "Prompt - ",
		defaultMessage: "Upload an image"
	},
	upload_image_title:{
		id: "upload_image_title",
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

	const showInit = jazzSupported && prompt == 'select_file' ? true : true

	return(

		<DIV id="Prompts" className={ cls } >
			<H priority={ 2 }>{ str }
			{ showInit && <SPAN> <A href="#" onClick={ openInput } title={ formatMessage( messages.upload_image_title ) } >{ formatMessage( messages.upload_image ) }</A> { formatMessage( messages.or ) } <A href="#" onClick={ showDialog.bind( this, 'SHARE' ) } title={ formatMessage( messages.tell_friend_title ) }>{ formatMessage( messages.tell_friend ) }</A>. <CLOSE onClick={ hide } title={ formatMessage( messages.just_browse ) } /></SPAN> } 
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
