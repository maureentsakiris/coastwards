import React from 'react'
import { PropTypes } from 'prop-types'

import PRIVACYPOLICY from 'components/privacypolicy/privacypolicy'
import Snackbar from 'containers/ui/snackbar'
import Dialog from 'containers/ui/dialog'

 
import DIV from 'components/tags/div'


import style from './_context'

const contextPrivacyPolicy = ( { lang, dir } ) => {

	//const { formatMessage } = intl


	return(

		<DIV lang={ lang } dir={ dir } >
			<DIV className={ style.jazz } >
				<PRIVACYPOLICY />
			</DIV>
			<Snackbar />
			<Dialog />
		</DIV>

	)

}

contextPrivacyPolicy.propTypes = {

	lang: PropTypes.string,
	dir: PropTypes.string,

}

export default contextPrivacyPolicy


