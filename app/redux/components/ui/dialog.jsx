import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import WHYIP from './dialogs/whyIP'
import NOJAZZ from './dialogs/nojazz'

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import I from 'components/tags/i' 

import style from './_dialog.scss'


const messages = defineMessages( {

	close_dialog:{
		id: "close_dialog",
		description: "Hover title - Close dialog",
		defaultMessage: "Close dialog"
	}

} )


const dialog = ( { intl, component, active, closeDialog } ) => {

	const { formatMessage } = intl

	if( !active ){

		return null

	}else{

		return(

			<DIV className={ style.dialog } >
				<A className={ style.close } href="#" onClick={ closeDialog } title={ formatMessage( messages.close_dialog ) } ><I className="material-icons" >&#xE5CD;</I></A>
				<DIV className={ style.body } >
					{ component == 'WHYIP' && <WHYIP /> }
					{ component == 'NOJAZZ' && <NOJAZZ /> }
				</DIV>
			</DIV>

		)

	}

}

dialog.propTypes = {

	intl: intlShape,
	component: PropTypes.node,
	active: PropTypes.bool,
	closeDialog: PropTypes.func

}

export default injectIntl ( dialog )