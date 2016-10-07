import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import H from 'components/tags/h'

//import style from './_statuses'

const messages = defineMessages( {

	status_validating:{
		id: "status_validating",
		description: "Status - Informs user that selected image(s) is being validated",
		defaultMessage:"Validating your image .. (just a few seconds)"
	},
	status_uploading:{
		id: "status_uploading",
		description: "Status - Informs user that his image is being uploaded",
		defaultMessage: "Uploading... {progress}%"
	},
	here_we_go:{
		id: "here_we_go",
		description: "Snack - ",
		defaultMessage: "Awesome! Here we go!"
	}

} )

const statuses = ( { intl, className, show, status, progress } ) => {

	const { formatMessage } = intl

	const stat = messages[ status ] ? formatMessage( messages[ status ], { progress: progress } ) : status

	if( !show ){

		return null

	}else{

		const cls = Classnames( className )

		return(

			<DIV id="Statuses" className={ cls } >
				<H priority={ 2 }>{ stat }</H>
			</DIV>

		)

	}
	
}

statuses.propTypes = {

	intl: intlShape.isRequired,

	className: PropTypes.string,

	show: PropTypes.bool,
	status: PropTypes.string,
	progress: PropTypes.number,

	resetForm: PropTypes.func

}

export default injectIntl( statuses )