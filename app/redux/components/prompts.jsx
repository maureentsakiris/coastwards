import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import A from 'components/tags/a'
import P from 'components/tags/p'

import style from './_prompts'


const messages = defineMessages( {

	select_file:{
		id: "select_file",
		description: "Prompt - Prompts user to select a file through the file system",
		defaultMessage: "Have any pictures of coasts? Why not upload them now?"
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
	too_many:{
		id: "too_many",
		description: "Link - ",
		defaultMessage: "(I have too many to upload one by one!)"
	},
	browse_map:{
		id: "browse_map",
		description: "Button - ",
		defaultMessage: "Browse map"
	},
	upload_image:{
		id: "upload_image",
		description: " - ",
		defaultMessage: "Upload image"
	},
	read_guidelines:{
		id: "read_guidelines",
		description: " - ",
		defaultMessage: "Read guidelines"
	}
	

	/*,
	how:{
		id: "how",
		description: " - ",
		defaultMessage: "How do I upload an image?"
	},
	what_again:{
		id: "what_again",
		description: " - ",
		defaultMessage: "What kind of pictures?"
	}*/


} )

const prompts = ( { intl, className, prompt, jazzSupported, show, hide, showDialog, openInput } ) => {

	const { formatMessage } = intl

	const str = messages[ prompt ] ? formatMessage( messages[ prompt ] ) : prompt

	const init = prompt == 'select_file' && jazzSupported

	const cls = Classnames( className, style.prompts, {

		[ style.show ]: show

	} )

	const clsHeader = Classnames( {

		[ style.header ]: jazzSupported

	} )

	const clsToomany = Classnames( {

		[ style.toomany ]: jazzSupported

	} )

	/*<A onClick={ () => {} } className={ style.toomany } >{ formatMessage( messages.what_again ) }</A>
			<A onClick={ () => {} } className={ style.toomany } >{ formatMessage( messages.how ) }</A>
			<A onClick={ () => {} } className={ style.toomany } >{ formatMessage( messages.too_many ) }</A>


			<A onClick={ openInput } className={ style.option } >{ formatMessage( messages.upload_image ) }</A>
				<A onClick={ openInput } className={ style.option } >{ formatMessage( messages.read_guidelines ) }</A>*/

	return(

		<DIV id="Prompts" className={ cls } >
			<H className={ clsHeader } priority={ 2 }>{ str }</H>
		
			{ jazzSupported && <DIV>
				{ init && <P className={ style.selecthelp } ><small>({ formatMessage( messages.select_help ) })</small></P> }
				<A onClick={ hide } className={ style.option } >{ formatMessage( messages.browse_map ) }</A> 
			</DIV> }

			<A className={ clsToomany } onClick={ showDialog.bind( this, 'TOOMANY' ) }  ><small>{ formatMessage( messages.too_many ) }</small></A>
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
	showDialog: PropTypes.func,
	openInput: PropTypes.func

}

export default injectIntl( prompts )