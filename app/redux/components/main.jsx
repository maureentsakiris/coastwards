import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import Errors from 'containers/errors'
import Statuses from 'containers/statuses'
import Prompts from 'containers/prompts'
import Upload from 'containers/upload'
import Locate from 'containers/locate'
import Geolocator from 'containers/geolocator'
import Form from 'containers/form'

import H from 'components/tags/h'
import DIV from 'components/tags/div'

const messages = defineMessages( {

	unsupported:{
		id: "unsupported",
		description: "Warning - Warns the user that his browser does not support the image upload",
		defaultMessage: ":/ Looks like you are on an old browser that does not support some features we need to make this website work. Sorry, you'll need to upgrade or switch browsers to continue..."
	}

} )

const main = ( { intl, uploadSupported } ) => {

	const { formatMessage } = intl

	if( !uploadSupported ){

		return(

			<DIV id="Main" >
				<H priority={ 2 }>{ formatMessage( messages.all_set ) }</H>
				<p>{ formatMessage( messages.unsupported ) }</p>
			</DIV>

		)

	}else{

		return(

			<DIV id="Main" >
				<Prompts />
				<Errors /> 
				<Statuses />
				<Upload />
				<Locate />
				<Geolocator />
				<Form />
			</DIV>

		)

	}
	
}

main.propTypes = {

	intl: intlShape.isRequired,

	uploadSupported: PropTypes.bool
	
}

export default injectIntl( main )
