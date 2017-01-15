import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import WHYIP from './dialogs/whyIP'
import DEFINEMATERIAL from './dialogs/definematerial'
import SHARE from './dialogs/share'
import IMPRINT from './dialogs/imprint'

import DIV from 'components/tags/div'
import CLOSE from 'components/ui/close'

import style from './_dialog.scss'


const messages = defineMessages( {

	close_dialog:{
		id: "close_dialog",
		description: "Hover title - Close dialog",
		defaultMessage: "Close dialog"
	}

} )


const dialog = ( { intl, component, active, jazzSupported, closeDialog } ) => {

	const { formatMessage } = intl


	const clsDialog = Classnames( style.dialog, {

		[ style.dialogJazz ]: jazzSupported

	} )
	

	if( !active ){

		return null

	}else{

		return(

			<DIV className={ clsDialog } >
				<DIV>
					<CLOSE onClick={ closeDialog } title={ formatMessage( messages.close_dialog ) } />
					{ component == 'WHYIP' && <WHYIP /> }
					{ component == 'DEFINEMATERIAL' && <DEFINEMATERIAL /> }
					{ component == 'SHARE' && <SHARE /> }
					{ component == 'IMPRINT' && <IMPRINT /> }
				</DIV>
			</DIV>

		)

	}

}

dialog.propTypes = {

	intl: intlShape,
	component: PropTypes.node,
	active: PropTypes.bool,
	jazzSupported: PropTypes.bool,

	closeDialog: PropTypes.func

}

export default injectIntl ( dialog )
