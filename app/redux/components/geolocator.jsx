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
			<H priority={ 2 }>{ formatMessage( messages.take_you_there ) }</H>
			<small>Sorry, this is not quite finished yet</small>   
			<P>
				<A onClick={ resetMain }  className={ style.option } >OK, cancel then</A>
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
