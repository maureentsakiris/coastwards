import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import A from 'components/tags/a'
import I from 'components/tags/i'

import style from './_close'


const messages = defineMessages( {

	close:{
		id: "close",
		description: "Hover title - Close",
		defaultMessage: "Close"
	}

} )

const close = ( { intl, className, onClick } ) => {

	const { formatMessage } = intl

	const clsIcon = Classnames( 'material-icons', style.icon, className )

	return(

		<A href="#" className={ className } onClick={ onClick } title={ formatMessage( messages.close ) } ><I className={ clsIcon } >&#xE5CD;</I></A>

	)
	
}

close.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,
	onClick: PropTypes.func

}

export default injectIntl( close )