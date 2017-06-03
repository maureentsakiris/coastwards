import React from 'react'
import { PropTypes } from 'prop-types'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import H from 'components/tags/h'
import DIV from 'components/tags/div'
import A from 'components/tags/a'
import P from 'components/tags/p'

import style from './_locate'


const messages = defineMessages( {

	can_you_locate:{
		id: "can_you_locate",
		description: "Status - Informs user that we couldn't extract the location from the metadata and prompts user to locate the image for us",
		defaultMessage: "We couldn't find the location in the metadata. Do you remember exactly where you took this picture?"
	},
	yes_location_known:{
		id: "yes_location_known",
		description: "Label - Yes, I can locate this coast",
		defaultMessage: "Yes, I can locate this coast"
	},
	no_location_unknown:{
		id: "no_location_unknown",
		description: "Label - No, I don't remember",
		defaultMessage: "No, I don't remember"
	}

} )

const main = ( { intl, className, show, showMarker, resetMain } ) => {

	const { formatMessage } = intl

	const cls = Classnames( className, style.locate, {

		[ style.show ]: show

	} )

	return(

		<DIV className={ cls } >
			<H priority={ 2 }>{ formatMessage( messages.can_you_locate ) }</H>
			<P>
				<A onClick={ showMarker } className={ style.option } >{ formatMessage( messages.yes_location_known ) }</A>
				<A onClick={ resetMain }  className={ style.option } >{ formatMessage( messages.no_location_unknown ) }</A>
			</P>
		</DIV> 

	)
	
}

main.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string,
	show: PropTypes.bool,

	showMarker: PropTypes.func,
	resetMain: PropTypes.func

}

export default injectIntl( main )