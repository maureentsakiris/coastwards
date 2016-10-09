import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import I from 'components/tags/i'

const messages = defineMessages( {


} )

const popup = ( { intl, feature, hidePopup } ) => {

	const { formatMessage } = intl

	return(

		<DIV id="Popup">
			<A onClick={ hidePopup } >
				<I className="material-icons">clear</I>
			</A>
			{ feature.properties && <p>{ feature.properties.image }</p> }
		</DIV>

	)
	
}

popup.propTypes = {

	intl: intlShape.isRequired,

	feature: PropTypes.object,

	hidePopup: PropTypes.func

}

export default injectIntl( popup )
