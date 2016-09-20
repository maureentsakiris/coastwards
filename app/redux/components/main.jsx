import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import Errors from 'containers/errors'
import Statuses from 'containers/statuses'
import Prompts from 'containers/prompts'
import Upload from 'containers/upload'
import Locate from 'containers/locate'
import Geolocator from 'containers/geolocator'
import Form from 'containers/form'

import DIV from 'components/tags/div'
import P from 'components/tags/p'

import style from './_main'

const messages = defineMessages( {

	unsupported:{
		id: "unsupported",
		description: "Warning - Warns the user that his browser does not support the image upload",
		defaultMessage: ":/ Looks like you are on an old browser that does not support some features we need to make this website work. Sorry, you'll need to upgrade or switch browsers to continue..."
	}

} )

const main = ( { intl, uploadSupported, mapboxSupported } ) => {

	const { formatMessage } = intl

	if( !uploadSupported ){

		return(

			<DIV id="Main" className={ style.pad } >
				<Prompts />
				<P className={ style.corset } >{ formatMessage( messages.unsupported ) }</P>
			</DIV>

		)

	}else if ( uploadSupported && !mapboxSupported ){

		return(

			<DIV id="Main" className={ style.pad } >
				<Prompts className={ style.corset } />
				<Errors className={ style.corset } /> 
				<Statuses className={ style.corset } />
				<Geolocator className={ style.corset } />
				<Locate className={ style.corset } />
				<Upload className={ style.corset } />
				<Form className={ style.corset } />
			</DIV>

		)


	}else if ( uploadSupported && mapboxSupported ) {

		return(

			<DIV id="Main" >
				<DIV id="Screens" className={ style.pad } >
					<Prompts />
					<Errors /> 
					<Statuses />
					<Geolocator />
					<Locate />
				</DIV>
				<Upload />
				<Form />
			</DIV>

		)

	}
	
}

main.propTypes = {

	intl: intlShape.isRequired,

	uploadSupported: PropTypes.bool,
	mapboxSupported: PropTypes.bool
	
}

export default injectIntl( main )
