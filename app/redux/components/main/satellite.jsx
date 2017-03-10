import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import A from 'components/tags/a'
import IMG from 'components/tags/img'


import style from './_satellite'


const messages = defineMessages( {

	switch_to_satellite:{
		id: "switch_to_satellite",
		description: "Alt - ",
		defaultMessage: "Switch to satellite view"
	},
	switch_to_vector:{
		id: "switch_to_vector",
		description: " - ",
		defaultMessage: "Switch to vector view"
	}

} )

const satellite = ( { intl, show, modus, toggleSatellite } ) => {

	const { formatMessage } = intl

	const img = modus == 'vector' ? 'assets/satellite.png' : 'assets/vector.png'
	const title = modus == 'vector' ? formatMessage( messages.switch_to_satellite ) : formatMessage( messages.switch_to_vector )

	const cls = Classnames( style.satellite, {

		[ style.show ]: show

	} )

	return(

		<A className={ cls } href="#" onClick={ toggleSatellite } title={ title } ><IMG src={ img } alt={ title } /></A>

	)

	
}

satellite.propTypes = {

	intl: intlShape.isRequired,

	modus: PropTypes.string,
	show: PropTypes.bool,

	toggleSatellite: PropTypes.func

}

export default injectIntl( satellite )
