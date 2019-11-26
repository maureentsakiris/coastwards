import React from 'react'
import { PropTypes } from 'prop-types'

import MAIN from 'components/map/main'
import Snackbar from 'containers/ui/snackbar'
import Dialog from 'containers/ui/dialog'

 
import DIV from 'components/tags/div'


import style from './_context'

 
const contextApp = ( { lang, dir } ) => {

	//const { formatMessage } = intl


	return(

		<DIV lang={ lang } dir={ dir } >
			<DIV className={ style.jazz } >
				<MAIN />
			</DIV>
			<Snackbar />
			<Dialog />
		</DIV>

	)

}

contextApp.propTypes = {

	lang: PropTypes.string,
	dir: PropTypes.string,

}

export default contextApp


