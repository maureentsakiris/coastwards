import React from 'react'
import { PropTypes } from 'prop-types'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
/*import Classnames from 'classnames'*/

import WHYIP from './dialogs/whyIP'
import DEFINEMATERIAL from 'containers/ui/dialogs/definematerial'
import SHARE from './dialogs/share'
import IMPRINT from './dialogs/imprint'
import TERMS from './dialogs/terms'

import REPORT from 'containers/ui/dialogs/report'

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


const dialog = ( { intl, component, active/*, jazzSupported*/, closeDialog } ) => {

	const { formatMessage } = intl


	/*const clsDialog = Classnames( style.dialog, {

		[ style.dialogJazz ]: jazzSupported

	} )*/
	

	if( !active ){

		return null

	}else{

		return(

			<DIV className={ style.dialog } >
				<DIV>
					{ component == 'WHYIP' && <WHYIP /> }
					{ component == 'DEFINEMATERIAL' && <DEFINEMATERIAL /> }
					{ component == 'SHARE' && <SHARE /> }
					{ component == 'IMPRINT' && <IMPRINT /> }
					{ component == 'TERMS' && <TERMS /> }
					{ component == 'REPORT' && <REPORT /> }
					<CLOSE onClick={ closeDialog } title={ formatMessage( messages.close_dialog ) } />
				</DIV>
			</DIV>

		)

	}

}

dialog.propTypes = {

	intl: intlShape,
	component: PropTypes.node,
	active: PropTypes.bool,
	/*jazzSupported: PropTypes.bool,*/

	closeDialog: PropTypes.func

}

export default injectIntl ( dialog )
