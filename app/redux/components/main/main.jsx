import React from 'react'
import { PropTypes } from 'prop-types'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

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
import Legend from 'containers/main/legend'

import Credits from 'containers/main/credits'
import DIV from 'components/tags/div'
import P from 'components/tags/p'
import I from 'components/tags/i'
import A from 'components/tags/a'

import style from './_main'

const messages = defineMessages( {

	unsupported:{
		id: "unsupported",
		description: "Warning - Warns the user that his browser does not support the image upload",
		defaultMessage: "Oops nope ... looks like you're browser is even older than we thought. Sorry, you'll have to switch to a more modern browser to continue."
	},
	nojazz_text:{
		id: "nojazz_text",
		description: "P - ",
		defaultMessage: "Hmm, looks like you are using an old browser (or a not so old Internet Explorer). This site will work on your browser BUT IT'S SOO MUCH MORE FUN if you switch to a modern browser, plus you can navegate the coasts of this world. Chrome, Firefox or Safari are safe choices, especially if updated to the latest versions."
	},
	arrow_up_title:{
		id: "arrow_up_title",
		description: "Title - ",
		defaultMessage: "Show intro"
	}
	
} )

const main = ( { intl, uploadSupported, jazzSupported, useraction, clipped, unclipPage } ) => {

	const { formatMessage } = intl

	if( !uploadSupported ){

		return(

			<P className={ style.alert } >{ formatMessage( messages.unsupported ) }</P>

		)

	}else if ( uploadSupported && !jazzSupported ){

		return(

			<DIV id="Main" className={ style.noJazz } >
				<Prompts />
				<Errors /> 
				<Statuses />
				<Upload />
				<Form />
				<P className={ style.alert } >{ formatMessage( messages.nojazz_text ) }</P>
			</DIV>

		)


	}else if ( uploadSupported && jazzSupported ) {

		const clsArrow = Classnames( style.arrow, {

			[ style.show ]: useraction !== 'uploading' && clipped

		} )

		return(

			<DIV id="Main" className={ style.jazz } >
				<Mapbox className={ style.mapbox } />
				<Upload className={ style.fullscreen } />
				<Loader className={ style.screen } />
				<Locate className={ style.screen } />
				<Marker className={ style.marker } />
				<Prompts className={ style.screen } />
				<Statuses className={ style.screen } />
				<Errors className={ style.screen } />
				<Form />
				<Credits />
				<Legend />
				<Popup />
				<DIV className={ clsArrow } >
					<A onClick={ unclipPage.bind( this ) } title={ formatMessage( messages.arrow_up_title ) } ><I className="material-icons">&#xE316;</I></A>
				</DIV>
			</DIV>

		)

	}
	
}

main.propTypes = {

	intl: intlShape.isRequired,

	uploadSupported: PropTypes.bool,
	jazzSupported: PropTypes.bool,
	useraction: PropTypes.string,
	clipped: PropTypes.bool,

	unclipPage: PropTypes.func
	
}

export default injectIntl( main )