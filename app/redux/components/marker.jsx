import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'


import DIV from 'components/tags/div'
import IMG from 'components/tags/img'
import I from 'components/tags/i'
import BUTTON from 'components/tags/button'

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
	}
	

} )


const marker = ( { intl, className, resetMain, setLocation, show, zoom } ) => {

	const { formatMessage } = intl

	const cls = Classnames( className, style.marker, {

		[ style.show ]: show

	} )

	const disabled = zoom < 14

	const clsDone = Classnames( style.doneBtn, {

		[ style.disabled ]: disabled

	} )

	return(

		<DIV className={ cls } >
			{ !disabled && <IMG src="./assets/marker-green.png" alt="Location marker" className={ style.img }  /> }
			{ disabled && <IMG src="./assets/marker-red.png" alt="Location marker" className={ style.img } /> }
			<BUTTON className={ style.cancelBtn } onClick={ resetMain } title={ formatMessage( messages.cancel_title ) } ><I className="material-icons">close</I></BUTTON>
			<BUTTON className={ clsDone } onClick={ setLocation } disabled={ disabled } title={ formatMessage( messages.done_title ) } ><I className="material-icons">done</I></BUTTON>
		</DIV> 

	)
	
}

marker.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,
	show: PropTypes.bool,
	zoom: PropTypes.number,
	center: PropTypes.object,

	resetMain: PropTypes.func,
	setLocation: PropTypes.func

}

export default injectIntl( marker )
