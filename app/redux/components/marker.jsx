import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import FORM from 'components/tags/form'
import H from 'components/tags/h'
import P from 'components/tags/p'
import DIV from 'components/tags/div'
import A from 'components/tags/a'
import IMG from 'components/tags/img'
import I from 'components/tags/i'
import BUTTON from 'components/tags/button'

import style from './_marker'


const messages = defineMessages( {


} )

const marker = ( { intl, className, resetMain, setLocation, show, zoom, center } ) => {

	const { formatMessage } = intl

	const cls = Classnames( className, style.marker, {

		[ style.show ]: show

	} )

	const clsDone = Classnames( style.doneBtn, {

		[ style.disabled ]: zoom < 14

	} )

	/*<P>
				<A onClick={ close }  className={ style.option } >{ formatMessage( messages.set_location ) }</A>
				<A onClick={ resetMain }  className={ style.option } >{ formatMessage( messages.cancel ) }</A>
			</P>
<P>[ { center.lng }, { center.lat } ]</P>
			<IMG src="./assets/marker-red.png" alt="Location marker" className={ style.marker } /> 
			<P><A onClick={ setLocation }  className={ style.option } >{ formatMessage( messages.set_location ) }</A></P>*/

	return(

		<DIV className={ cls } >
			{ zoom >= 14 && <IMG src="./assets/marker-green.png" alt="Location marker" className={ style.img }  /> }
			{ zoom < 14 && <IMG src="./assets/marker-red.png" alt="Location marker" className={ style.img } /> }
			<BUTTON className={ style.cancelBtn } onClick={ resetMain }><I className="material-icons">close</I></BUTTON>
			<BUTTON className={ clsDone } onClick={ setLocation }><I className="material-icons">done</I></BUTTON>
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
