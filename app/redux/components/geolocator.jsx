import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import FORM from 'components/tags/form'
import P from 'components/tags/p'
import BUTTON from 'components/tags/button'
import INPUT from 'components/tags/input'
import BR from 'components/tags/br'


const messages = defineMessages( {

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

const main = ( { intl, show, resetMain } ) => {

	const { formatMessage } = intl

	const style = {

		display: show ? 'block' : 'none'

	}

	return(

		<FORM id="Geolocator" style={ style } action="#" >
			<P>
				<INPUT form="Geolocator" name="lat" type="number" placeholder={ formatMessage( messages.latitude ) } />
				<BR/><BR/>
				<INPUT form="Geolocator" name="long" type="number" placeholder={ formatMessage( messages.longitude ) } />
			</P>
			<BUTTON type="button" onClick={ () => {} }>{ formatMessage( messages.check_in_location ) }</BUTTON>
			<BUTTON type="button" onClick={ resetMain }>{ formatMessage( messages.cancel_check_in ) }</BUTTON>
		</FORM> 

	)
	
}

main.propTypes = {

	intl: intlShape.isRequired,

	show: PropTypes.bool,

	resetMain: PropTypes.func

}

export default injectIntl( main )
