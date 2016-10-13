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
import Popup from 'containers/popup'

import DIV from 'components/tags/div'
import P from 'components/tags/p'
import A from 'components/tags/a'
import I from 'components/tags/i'

import style from './_main'

const messages = defineMessages( {

	unsupported:{
		id: "unsupported",
		description: "Warning - Warns the user that his browser does not support the image upload",
		defaultMessage: "Oops nope ... looks like you are on an old browser that does not support some features we need to make this website work. Sorry, you'll need to upgrade or switch browsers to continue."
	}
	
} )

const main = ( { intl, uploadSupported, jazzSupported, scrollUp } ) => {

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
				<div className={ style.fringe }>
					<A onClick={ scrollUp } className={ style.up } >
						<I className="material-icons">keyboard_arrow_up</I>
					</A>
				</div>
				<Mapbox className={ style.mapbox } />
				<Geolocator key="geolocator" className={ style.screen } />
				<Locate key="locate" className={ style.screen } />
				<Prompts key="prompts" className={ style.screen } />
				<Statuses key="statuses" className={ style.screen } />
				<Errors key="errors" className={ style.screen } />
				<Form className={ style.form } />
				<Upload className={ style.upload } />
				<Popup />
			</DIV>

		)

	}
	
}

main.propTypes = {

	intl: intlShape.isRequired,

	uploadSupported: PropTypes.bool,
	jazzSupported: PropTypes.bool,

	scrollUp: PropTypes.func,
	showPrompts: PropTypes.bool
	
}

export default injectIntl( main )
