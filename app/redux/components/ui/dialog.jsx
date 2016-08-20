import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import _ from 'underscore'

import { errorTranslations } from 'messages/error'
const dialogTranslations = defineMessages( {

	close_dialog:{
		id: "close_dialog",
		description: "Hover title - Close dialog",
		defaultMessage: "Close dialog"
	}

} )
const translations = _.extend( errorTranslations, dialogTranslations )

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'
import A from 'components/tags/a'
import I from 'components/tags/i' 


const dialog = ( { intl, title, message, active, closeDialog } ) => {

	const { formatMessage } = intl

	if( !active ){

		return null

	}else{

		const style = {

			position: 'fixed',
			width: '100%',
			height: '100%',
			textAlign: 'center',
			top: '0',
			bottom: '0',
			backgroundColor: 'rgba( 255, 255, 255, 0.9 )'
			
		}

		const t = translations[ title ] ? formatMessage( translations[ title ] ) : title
		const m = translations[ message ] ? formatMessage( translations[ message ] ) : message

		return(

			<DIV style={ style } >
				<A href="#" onClick={ closeDialog } title={ formatMessage( translations.close_dialog ) } ><I className="material-icons" >&#xE5CD;</I></A>
				<H priority={ 4 } >{ t }</H>
				<P>{ m }</P>
			</DIV>

		)

	}

}

dialog.propTypes = {

	intl: intlShape,
	title: PropTypes.string,
	message: PropTypes.string,
	active: PropTypes.bool,
	closeDialog: PropTypes.func

}

export default injectIntl ( dialog )
