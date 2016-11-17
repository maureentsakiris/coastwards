import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import IMG from 'components/tags/img'

import style from './_intro.scss'

const messages = defineMessages( {

	help_science:{
		id: "help_science",
		description: "Main Header. Line one",
		defaultMessage: "Help Science study the risks of sea-level rise"
	},
	by:{
		id: "by",
		description: "Main Header. Line two",
		defaultMessage: "by uploading pictures of coasts"
	},
	no_account:{
		id: "no_account",
		description: "Tagline. Informs user that creating an account is not necessary",
		defaultMessage: "No account. Just drag & drop"
	}

} )

const intro = ( { intl, className } ) => {

	const { formatMessage } = intl

	return(

		<DIV className={ className } >
			<IMG src="./assets/turtle.svg" alt="Logo coastwards: A turtle on a mission" className={ style.logo } />
			<H priority={ 1 } className={ style.headline } ><span>{ formatMessage( messages.help_science ) }</span> <span>{ formatMessage( messages.by ) }</span></H>
			<H priority={ 2 } className={ style.tagline } >{ formatMessage( messages.no_account ) }</H>
		</DIV>

	)

}

intro.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string

}

export default injectIntl( intro ) 