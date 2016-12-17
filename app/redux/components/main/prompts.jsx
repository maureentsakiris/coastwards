import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'
import A from 'components/tags/a'
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
		description: "Title - ",
		defaultMessage: "Upload an image"
	},
	tell_friend:{
		id: "tell_friend",
		description: "Title - ",
		defaultMessage: "Tell a friend"
	}


} )

const prompts = ( { intl, className, prompt, jazzSupported, show, hide, openInput, showDialog } ) => {

	const { formatMessage } = intl

	const str = messages[ prompt ] ? formatMessage( messages[ prompt ] ) : prompt

	const cls = Classnames( className, style.prompts, {

		[ style.show ]: show

	} )

	return(

		<DIV id="Prompts" className={ cls } onClick={ hide } >
			<H priority={ 2 }>{ str } 
				{ jazzSupported && <CLOSE onClick={ hide } /> }
			</H>
			<P><A href="#" onClick={ openInput }>{ formatMessage( messages.upload_image ) }</A> or <A href="#" onClick={ showDialog.bind( this, 'SHARE' ) }>{ formatMessage( messages.tell_friend ) }</A></P>
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
