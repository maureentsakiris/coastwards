import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import Errors from 'containers/errors'
import Statuses from 'containers/statuses'
import Prompts from 'containers/prompts'
import Upload from 'containers/upload'
import Locate from 'containers/locate'
import Geolocator from 'containers/geolocator'
import Form from 'containers/form'
import Mapbox from 'containers/mapbox'

import DIV from 'components/tags/div'
import P from 'components/tags/p'

import style from './_main'

const messages = defineMessages( {

	unsupported:{
		id: "unsupported",
		description: "Warning - Warns the user that his browser does not support the image upload",
		defaultMessage: "Oops nope ... looks like you are on an old browser that does not support some features we need to make this website work. Sorry, you'll need to upgrade or switch browsers to continue."
	}

} )

const main = ( { intl, uploadSupported, jazzSupported } ) => {

	const { formatMessage } = intl

	if( !uploadSupported ){

		return(

			<DIV id="Main" className={ style.pad } >
				<Prompts className={ style.corset } />
				<P className={ style.corset } >{ formatMessage( messages.unsupported ) }</P>
			</DIV>

		)

	}else if ( uploadSupported && !jazzSupported ){

		return(

			<DIV id="Main" className={ style.pad } >
				<Prompts className={ style.corset } />
				<Errors className={ style.corset } /> 
				<Statuses className={ style.corset } />
				<Upload className={ style.corset } />
				<Form className={ style.corset } />
			</DIV>

		)


	}else if ( uploadSupported && jazzSupported ) {

		return(

			<DIV id="Main" className={ style.main } >
				<div className={ style.fringe }></div>
				<Mapbox className={ style.mapbox } />
				<Geolocator className={ style.screen } />
				<Locate className={ style.screen } /> 
				<Form />
				<Upload className={ style.screen } />
				<Prompts className={ style.screen } />
				<Statuses className={ style.screen } />
				<Errors className={ style.screen } />
			</DIV>

		)

	}
	
}

main.propTypes = {

	intl: intlShape.isRequired,

	uploadSupported: PropTypes.bool,
	jazzSupported: PropTypes.bool
	
}

export default injectIntl( main )
