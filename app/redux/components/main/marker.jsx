import React, { PropTypes } from 'react'
//import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'


import DIV from 'components/tags/div'
//import IMG from 'components/tags/img'
/*import I from 'components/tags/i'
import BUTTON from 'components/tags/button'*/
//import A from 'components/tags/a'

import style from './_marker'


/*const messages = defineMessages( {

	cancel_upload:{
		id: "cancel_upload",
		description: "Button",
		defaultMessage: "Cancel upload"
	},
	continue_upload:{
		id: "continue_upload",
		description: "Button",
		defaultMessage: "Continue"
	}
	

} )*/


const marker = ( { /*intl,*/ className, /*resetMain, setLocation, setSnackbarMessage,*/ show, zoom, /*modus,*/ image } ) => {

	//const { formatMessage } = intl

	const cls = Classnames( className, style.marker, {

		[ style.show ]: show

	} )

	const locked = zoom < 14

	const clsTip = Classnames( style.tip, {

		[ style.tip_locked ]: locked

	} )

	const clsImg = Classnames( style.img, {

		[ style.img_locked ]: locked

	} )

	//const doneClick = locked ? setSnackbarMessage.bind( this, 'zoom_closer' ) : setLocation

	/*<BUTTON href="#" onClick={ resetMain } className={ style.cancel } title={ formatMessage( messages.cancel_upload ) } ><I className="material-icons">&#xE5CD;</I></BUTTON>
				<BUTTON href="#" onClick={ doneClick } className={ style.continue } title={ formatMessage( messages.continue_upload ) } ><I className="material-icons">&#xE876;</I></BUTTON>*/

	return(

		<DIV className={ cls } >
			<DIV className={ style.pointer }>
				{ image.dataURL && <DIV style={ { backgroundImage: 'url(' + image.dataURL + ')' } } className={ clsImg } ></DIV> }
				<DIV className={ clsTip }></DIV>
			</DIV>
		</DIV> 

	)
	
}


marker.propTypes = {

	/*intl: intlShape.isRequired,*/

	className: PropTypes.string,
	show: PropTypes.bool,
	zoom: PropTypes.number,
	image: PropTypes.object,

	/*resetMain: PropTypes.func,
	setLocation: PropTypes.func,
	setSnackbarMessage: PropTypes.func*/

}

export default marker
