import React from 'react'
import { PropTypes } from 'prop-types'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import BUTTON from 'components/tags/button'
import I from 'components/tags/i'
import A from 'components/tags/a'
import P from 'components/tags/p'

import style from './_actions'

const messages = defineMessages( {

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
	},
	sign_up:{
		id: "sign_up",
		description: "A - ",
		defaultMessage: "Notify me about ... "
	}

} )

const actions = ( { intl, hide, openInput, showDialog } ) => {

	const { formatMessage } = intl

	return(

		<DIV>
			<DIV>
				<DIV className={ style.labelBtn }>
					<BUTTON onClick={ showDialog.bind( this, 'SHARE' ) } title={ formatMessage( messages.shareBtn_title ) }><I className="material-icons">&#xE80D;</I></BUTTON>
					<P>{ formatMessage( messages.shareBtn_label ) }</P>
				</DIV>
				<DIV className={ style.labelBtn }>
					<BUTTON onClick={ openInput } title={ formatMessage( messages.uploadBtn_title ) }><I className="material-icons">&#xE439;</I></BUTTON>
					<P>{ formatMessage( messages.uploadBtn_label ) }</P>
				</DIV>
				<DIV className={ style.labelBtn }>
					<BUTTON onClick={ hide.bind( this ) } title={ formatMessage( messages.browseBtn_title ) }><I className="material-icons">&#xE417;</I></BUTTON>
					<P>{ formatMessage( messages.browseBtn_label ) }</P>
				</DIV>
			</DIV>
			<A className={ style.signUp } href="http://eepurl.com/b1-BSH" >{ formatMessage( messages.sign_up ) }</A>
		</DIV>

	)

}

actions.propTypes = {

	intl: intlShape.isRequired,

	hide: PropTypes.func,
	openInput: PropTypes.func,
	showDialog: PropTypes.func

}

export default injectIntl( actions )