import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import FORM from 'components/tags/form'
import H from 'components/tags/h'
import P from 'components/tags/p'
import DIV from 'components/tags/div'
import A from 'components/tags/a'
import IMG from 'components/tags/img'

import style from './_geolocator'


const messages = defineMessages( {

	get_closer:{
		id: "get_closer",
		description: "Header",
		defaultMessage: "Great, let's get you as close as possible"
	},
	cancel:{
		id: "cancel",
		description: "Button - ",
		defaultMessage: "cancel"
	}

} )

const main = ( { intl, className, resetMain, setLocation, show, zoom, center } ) => {

	const { formatMessage } = intl

	const cls = Classnames( className, style.geolocator, {

		[ style.show ]: show

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
			<H priority={ 2 }>{ formatMessage( messages.get_closer ) }</H>
			<DIV id="Geolocator" ></DIV>
			<P><A onClick={ resetMain } className={ style.option } >{ formatMessage( messages.cancel ) }</A></P>
		</DIV> 

	)
	
}

main.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,
	show: PropTypes.bool,
	zoom: PropTypes.number,
	center: PropTypes.object,

	resetMain: PropTypes.func,
	setLocation: PropTypes.func

}

export default injectIntl( main )
