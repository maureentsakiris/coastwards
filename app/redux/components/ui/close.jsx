import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import A from 'components/tags/a'
import I from 'components/tags/i'

//import style from './_close'


const messages = defineMessages( {

	close:{
		id: "close",
		description: "Hover title - Close",
		defaultMessage: "Close"
	}

} )

const close = ( { intl, onClick } ) => {

	const { formatMessage } = intl

	return(

		<A href="#" onClick={ onClick } title={ formatMessage( messages.close ) } ><I className="material-icons" style={ { verticalAlign: 'middle' } } >&#xE5CD;</I></A>

	)
	
}

close.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,
	onClick: PropTypes.func

}

export default injectIntl( close )