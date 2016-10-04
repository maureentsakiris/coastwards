import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import A from 'components/tags/a'
import I from 'components/tags/i'

//import style from './_prompts'


const messages = defineMessages( {

	close:{
		id: "close",
		description: "Hover title - Close",
		defaultMessage: "Close"
	},

	select_file:{
		id: "select_file",
		description: "Prompt - Prompts user to select a file through the file system",
		defaultMessage: "Have any pictures of coasts? Why not upload them now?"
	},
	drag_and_drop:{
		id: "drag_and_drop",
		description: "Prompt - Prompts user to drag and drop images onto the world map (or click the big red button)",
		defaultMessage: "Drag & drop your image onto the world map to upload (or click the big red button)"
	},
	click_button:{
		id: "click_button",
		description: "Prompt - Prompts user to upload images by clicking on the big red button",
		defaultMessage: "Click the big red button to upload an image"
	},

} )

const prompts = ( { intl, className, show, prompt, jazzSupported, hide } ) => {

	const { formatMessage } = intl

	const err = messages[ prompt ] ? formatMessage( messages[ prompt ] ) : prompt

	if( !show ){

		return null

	}else{

		const cls = Classnames( className )

		return(

			<DIV id="Prompts" className={ cls } >
				<H priority={ 2 }>{ err } 
					{ jazzSupported && <A href="#" onClick={ hide } title={ formatMessage( messages.close ) } ><I className="material-icons" style={ { verticalAlign: 'middle' } } >&#xE5CD;</I></A> }
				</H>
			</DIV>

		)

	}
	
}

prompts.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,
	
	show: PropTypes.bool,
	prompt: PropTypes.string,
	jazzSupported: PropTypes.bool,

	hide: PropTypes.func

}

export default injectIntl( prompts )