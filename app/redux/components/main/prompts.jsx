import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
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

	uploadBtn_title:{
		id: "uploadBtn_title",
		description: "Title - ",
		defaultMessage: "Upload an image"
	},
	shareBtn_title:{
		id: "shareBtn_title",
		description: "Title - ",
		defaultMessage: "Share with friends"
	}


} )

const prompts = ( { intl, className, prompt, jazzSupported, show, hide/*, openInput, showDialog*/ } ) => {

	const { formatMessage } = intl

	const str = messages[ prompt ] ? formatMessage( messages[ prompt ] ) : prompt

	const cls = Classnames( className, style.prompts, {

		[ style.show ]: show

	} )

	/*<A onClick={ () => {} } className={ style.toomany } >{ formatMessage( messages.what_again ) }</A>
			<A onClick={ () => {} } className={ style.toomany } >{ formatMessage( messages.how ) }</A>
			<A onClick={ () => {} } className={ style.toomany } >{ formatMessage( messages.too_many ) }</A>


			<A onClick={ openInput } className={ style.option } >{ formatMessage( messages.upload_image ) }</A>
				<A onClick={ openInput } className={ style.option } >{ formatMessage( messages.read_guidelines ) }</A>

				<H className={ clsHeader } priority={ 2 }>{ str }</H>
		
			{ jazzSupported && <DIV>
				{ init && <P className={ style.selecthelp } ><small>({ formatMessage( messages.select_help ) })</small></P> }
				<A onClick={ hide } className={ style.option } >{ formatMessage( messages.browse_map ) }</A> 
			</DIV> }

			<A className={ clsToomany } onClick={ showDialog.bind( this, 'TOOMANY' ) }  ><small>{ formatMessage( messages.too_many ) }</small></A>*/

			/*<P>
				<BUTTON className={ style.uploadBtn } title={ formatMessage( messages.uploadBtn_title ) } onClick={ openInput } ><I className="material-icons">&#xE439;</I></BUTTON>
				<BUTTON className={ style.shareBtn } title={ formatMessage( messages.shareBtn_title ) } onClick={ showDialog.bind( this, 'share' ) }><I className="material-icons">&#xE80D;</I></BUTTON>
			</P>*/

	return(

		<DIV id="Prompts" className={ cls } onClick={ hide } >
			<H priority={ 2 }>{ str } 
				{ jazzSupported && <CLOSE onClick={ hide } /> }
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

	hide: PropTypes.func/*,
	openInput: PropTypes.func,
	showDialog: PropTypes.func*/

}

export default injectIntl( prompts )
