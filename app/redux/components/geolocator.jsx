import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import FORM from 'components/tags/form'
import P from 'components/tags/p'
import H from 'components/tags/h'
import A from 'components/tags/a'

import style from './_geolocator'

const messages = defineMessages( {

	take_you_there:{
		id: "take_you_there",
		description: "Header",
		defaultMessage: "Great, so let's get you as close as possible. Type the address, nearest city or country and we will take you there."
	},
	zoom:{
		id: "zoom",
		description: "Header",
		defaultMessage: "Perfect! Click on the map to place a marker (but make sure you've zoomed in all the way first)"
	},
	check_in_location:{
		id: "check_in_location",
		description: "Label - Check in given location",
		defaultMessage: "Check in"
	},
	cancel_check_in:{
		id: "cancel_check_in",
		description: "Label - Cancel check in",
		defaultMessage: "Cancel check in"
	},
	latitude:{
		id: "latitude",
		description: "Placeholder - Latitude",
		defaultMessage: "Latitude"
	},
	longitude:{
		id: "longitude",
		description: "Placeholder - Longitude",
		defaultMessage: "Longitude"
	}

} )

const main = ( { intl, className, resetMain, show } ) => {

	const { formatMessage } = intl

	const cls = Classnames( className, style.geolocator, {

		[ style.show ]: show

	} )

	return(

		<FORM id="Geolocator" action="#" className={ cls } >
			<H priority={ 2 }>{ formatMessage( messages.zoom ) }</H>
			<P>
				<A onClick={ close }  className={ style.option } >!Got it</A>
				<A onClick={ resetMain }  className={ style.option } >!Nah, too much work</A>
			</P>
		</FORM> 

	)
	
}

main.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,
	show: PropTypes.bool,

	resetMain: PropTypes.func

}

export default injectIntl( main )
