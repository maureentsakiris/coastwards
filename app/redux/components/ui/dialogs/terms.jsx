import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import UL from 'components/tags/ul'
import LI from 'components/tags/li'
/*import P from 'components/tags/p'
import BR from 'components/tags/br'*/

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
	},
	honor_privacy:{
		id: "honor_privacy",
		description: "P - ",
		defaultMessage: "By uploading this image you confirm that it does not contain any personal data."
	}

 
} )


const terms = ( { intl, className } ) => {

	const { formatMessage } = intl

	/*<BR/><BR/>
			<H priority={ 3 }>{ formatMessage( messages.warning_notice ) }</H>
			<P>{ formatMessage( messages.no_liability ) }</P>*/

	return(

		<DIV className={ className } >
			<H priority={ 2 }>{ formatMessage( messages.terms_header ) }</H>
			<UL className={ style.list } >
				<LI>1) { formatMessage( messages.terms_author ) }</LI>
				<LI>2) { formatMessage( messages.honor_privacy ) }</LI>
				<LI>3) <FormattedMessage
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
