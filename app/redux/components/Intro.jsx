import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'

import style from './_headers.scss'

const messages = defineMessages( {

	help_science:{
		id: "help_science",
		description: "Main Header. Summarizes project in one sentence",
		defaultMessage: "Help Science study the risks of sea-level rise by uploading pictures of coasts"
	},
	no_account:{
		id: "no_account",
		description: "Tagline. Informs user that creating an account is not necessary",
		defaultMessage: "No account. Just drag & drop"
	}

} )

const intro = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<DIV id="Intro" className={ style.corset } >
			<H priority={ 1 } className={ style.center } >{ formatMessage( messages.help_science ) }</H>
			<H priority={ 2 } className={ style.center } >{ formatMessage( messages.no_account ) }</H>
		</DIV>

	)

}

intro.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( intro ) 