import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import UL from 'components/tags/ul'
import LI from 'components/tags/li'

import style from './_terms'

const messages = defineMessages( {

	terms_header:{
		id: "terms_header",
		description: "Header",
		defaultMessage: "Terms"
	},
	terms_author:{
		id: "terms_author",
		description: "P - ",
		defaultMessage: "By uploading this image you confirm that you are the sole author of this image."
	},
	terms_cc0:{
		id: "terms_cc0",
		description: "P - ",
		defaultMessage: "By uploading this image you agree to waive your copyright and place the image in the public domain under the {license}."
	},
	license:{
		id: "license",
		description: "Link - ",
		defaultMessage: "Creative Commons CC0 1.0 Universal (CC0 1.0) Public Domain Dedication license"
	},
	http_license:{
		id: "http_license",
		description: "HTTP - ",
		defaultMessage: "https://creativecommons.org/publicdomain/zero/1.0/"
	}

 
} )


const terms = ( { intl, className } ) => {

	const { formatMessage } = intl

	return(

		<DIV className={ className } >
			<H priority={ 2 }>{ formatMessage( messages.terms_header ) }</H>
			<UL className={ style.list } >
				<LI>{ formatMessage( messages.terms_author ) }</LI>
				<LI>
					<FormattedMessage
						id="terms_cc0"
						values={ { 
							license: <a target="_blank" href={ formatMessage( messages.http_license ) }>{ formatMessage( messages.license ) }</a>
						} }
					/>
				</LI>
			</UL>
		</DIV>

	)

}

terms.propTypes = {

	intl: intlShape,
	className: PropTypes.string

}

export default injectIntl ( terms )
