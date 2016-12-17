import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import WHYIP from './dialogs/whyIP'
import NOJAZZ from './dialogs/nojazz'
import DEFINEMATERIAL from './dialogs/definematerial'
import WHYHASHTAG from './dialogs/whyhashtag'
import TESTSITE from './dialogs/testsite'

import NASSOS from './dialogs/nassos'
import CLAUDIA from './dialogs/claudia'
import JOERN from './dialogs/joern'
import ME from './dialogs/me'

import TOOMANY from './dialogs/toomany'
import SHARE from './dialogs/share'

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
					{ component == 'NOJAZZ' && <NOJAZZ /> }
					{ component == 'DEFINEMATERIAL' && <DEFINEMATERIAL /> }
					{ component == 'WHYHASHTAG' && <WHYHASHTAG /> }
					{ component == 'TESTSITE' && <TESTSITE /> }

					{ component == 'NASSOS' && <NASSOS /> }
					{ component == 'CLAUDIA' && <CLAUDIA /> }
					{ component == 'JOERN' && <JOERN /> }
					{ component == 'ME' && <ME /> }

					{ component == 'TOOMANY' && <TOOMANY /> }
					{ component == 'SHARE' && <SHARE /> }
					
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
