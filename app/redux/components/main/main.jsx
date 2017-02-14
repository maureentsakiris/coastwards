import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import Errors from 'containers/main/errors'
import Statuses from 'containers/main/statuses'
import Prompts from 'containers/main/prompts'
import Upload from 'containers/main/upload'
import Locate from 'containers/main/locate'
import Marker from 'containers/main/marker'
import Form from 'containers/main/form'
import Mapbox from 'containers/main/mapbox'
import Popup from 'containers/main/popup'
import Loader from 'containers/main/loader'
import Counter from 'containers/main/counter'

import DIV from 'components/tags/div'
import P from 'components/tags/p'

import style from './_main'

const messages = defineMessages( {

	unsupported:{
		id: "unsupported",
		description: "Warning - Warns the user that his browser does not support the image upload",
		defaultMessage: "Oops nope ... looks like you're browser is even older than we thought. Sorry, you'll have to switch to a more modern browser to continue."
	}
	
} )

const main = ( { intl, uploadSupported, jazzSupported } ) => {

	const { formatMessage } = intl

	if( !uploadSupported ){

		return(

			<DIV className={ style.noupload } >
				<Prompts className={ style.corset } />
				<P className={ style.corset } >{ formatMessage( messages.unsupported ) }</P>
			</DIV>

		)

	}else if ( uploadSupported && !jazzSupported ){

		return(

			<DIV className={ style.barebones } >
				<Prompts className={ style.corset } />
				<Errors className={ style.corset } /> 
				<Statuses className={ style.corset } />
				<Upload className={ style.corset } />
				<Form className={ style.corset } />
			</DIV>

		)


	}else if ( uploadSupported && jazzSupported ) {

		return(

			<DIV id="Main" className={ style.jazz } >
				<Mapbox className={ style.mapbox } />
				<Loader className={ style.screen } />
				<Locate key="locate" className={ style.screen } />
				<Marker key="marker" className={ style.marker } />
				<Prompts key="prompts" className={ style.screen } />
				<Statuses key="statuses" className={ style.screen } />
				<Errors key="errors" className={ style.screen } />
				<Form className={ style.form } />
				<Upload className={ style.upload } />
				<Counter />
				<Popup />
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
