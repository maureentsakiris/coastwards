import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'


import DIV from 'components/tags/div'
import IMG from 'components/tags/img'
import I from 'components/tags/i'
import BUTTON from 'components/tags/button'
import A from 'components/tags/a'

import style from './_marker'


const messages = defineMessages( {

	cancel_title:{
		id: "cancel_title",
		description: "Title - ",
		defaultMessage: "Cancel upload"
	},
	done_title:{
		id: "done_title",
		description: "Title - ",
		defaultMessage: "Continue with this location"
	},
	switch_to_satellite:{
		id: "switch_to_satellite",
		description: "Alt - ",
		defaultMessage: "Switch to satellite view"
	},
	switch_to_vector:{
		id: "switch_to_vector",
		description: " - ",
		defaultMessage: "Switch to vector view"
	},
	cancel:{
		id: "cancel",
		description: "Button",
		defaultMessage: "Cancel upload"
	},
	continue:{
		id: "continue",
		description: "Button",
		defaultMessage: "Continue"
	}
	

} )


const marker = ( { intl, className, resetMain, setLocation, toggleSatellite, addSnackbarMessage, show, zoom, modus, image } ) => {

	const { formatMessage } = intl

	const cls = Classnames( className, style.marker, {

		[ style.show ]: show

	} )

	const locked = zoom < 14

	/*<BUTTON className={ style.cancelBtn } onClick={ resetMain } title={ formatMessage( messages.cancel_title ) } ><I className="material-icons">close</I></BUTTON>
			<BUTTON className={ clsDone } onClick={ setLocation } locked={ locked } title={ formatMessage( messages.done_title ) } ><I className="material-icons">done</I></BUTTON>
			<A href="#" onClick={ toggleSatellite } className={ style.toggleSatellite } >satellite</A>

			{ !locked && <IMG src="./assets/marker-green.png" alt="Location marker" className={ style.tip }  /> }
				{ locked && <IMG src="./assets/marker-red.png" alt="Location marker" className={ style.tip } /> }

				<DIV className={ style.tip_tip }></DIV>*/

	const clsTip = Classnames( style.tip, {

		[ style.tip_locked ]: locked

	} )

	const clsImg = Classnames( style.img, {

		[ style.img_locked ]: locked

	} )

	const img = modus == 'vector' ? 'assets/satellite.png' : 'assets/vector.png'
	const title = modus == 'vector' ? formatMessage( messages.switch_to_satellite ) : formatMessage( messages.switch_to_vector )

	const doneClick = locked ? addSnackbarMessage.bind( this, 'zoom_closer' ) : setLocation


	return(

		<DIV className={ cls } >
			<DIV className={ style.pointer }>
				{ image.dataURL && <DIV style={ { backgroundImage: 'url(' + image.dataURL + ')' } } className={ clsImg } ></DIV> }
				<DIV className={ clsTip }></DIV>
			</DIV>
			<A href="#" onClick={ toggleSatellite } className={ style.toggle } title={ title } ><IMG src={ img } alt={ title } /></A>
			<BUTTON href="#" onClick={ resetMain } className={ style.cancel } title={ formatMessage( messages.cancel ) } ><I className="material-icons">close</I></BUTTON>
			<BUTTON href="#" onClick={ doneClick } className={ style.continue } title={ formatMessage( messages.continue ) } ><I className="material-icons">done</I></BUTTON>
		</DIV> 

	)
	
}


marker.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,
	show: PropTypes.bool,
	zoom: PropTypes.number,
	modus: PropTypes.string,
	image: PropTypes.object,

	resetMain: PropTypes.func,
	setLocation: PropTypes.func,
	toggleSatellite: PropTypes.func,
	addSnackbarMessage: PropTypes.func

}

export default injectIntl( marker )
