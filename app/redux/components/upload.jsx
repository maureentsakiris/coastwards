import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Modernizr from 'modernizr'
import _ from 'underscore'

import FORM from 'components/tags/form'
import DIV from 'components/tags/div'
import P from 'components/tags/p'
import INPUT from 'components/tags/input'

import FILE from 'containers/file'

const messages = defineMessages( {

	unsupported:{
		id: "unsupported",
		description: "Warning - Warns the user that his browser does not support the image upload",
		defaultMessage: "Your browser does not support the technologies used to upload images"
	},
	any_more_questions: {
		id: "any_more_questions",
		description: "Status - Asks users if any questions are open",
		defaultMessage: "Any more questions?"
	},
	select_images:{
		id: "select_images",
		description: "Status - Select your images",
		defaultMessage: "Select your images below"
	},
	select_images_mapbox:{
		id: "select_images_mapbox",
		description: "Status - Select your images",
		defaultMessage: "Drag & drop your images onto the world map to upload (or click the big red button)"
	},
	select_images_mapbox_touch:{
		id: "select_images_mapbox_touch",
		description: "Status - Select your images",
		defaultMessage: "Click the big red button to upload pictures"
	}

} )

const upload = ( { intl, status, imagesValid, validateFiles, mapboxSupported } ) => {

	const { formatMessage } = intl
	const supported = Modernizr.xhr2 || Modernizr.xhrresponsetypejson

	if( !supported ){

		return( 

			<p>{ formatMessage( messages.unsupported ) }</p>

		)

	}else{

		const accepted = imagesValid.length > 0
		const validImages = accepted ? _createValidImagesList( imagesValid ) : ''
		const prompt = mapboxSupported && Modernizr.touchevents ? 'select_images_mapbox_touch' : 'select_images_mapbox'
		const stat = status ? status : prompt

		return(

			<DIV id="Upload" >
				<P>!STATUS: { formatMessage( messages[ stat ] ) }</P>
				<FORM action="#" id="upload">
					{ !accepted && <INPUT onChange={ validateFiles } form="upload" type="file" multiple={ true } /> }
					{ validImages }
				</FORM>
			</DIV>

		)

	}

}

const _createValidImagesList = ( imagesValid ) => {

	return _.map( imagesValid, ( file, index ) => {

		return React.createElement( FILE, {

			key: index,
			f: file

		} )

	} )

}

upload.propTypes = {

	intl: intlShape.isRequired,
	status: PropTypes.string,
	filesAccepted: PropTypes.array,
	filesRejected: PropTypes.array,
	imagesValid: PropTypes.array,
	imagesInvalid: PropTypes.array,
	validateFiles: PropTypes.func.isRequired,
	mapboxSupported: PropTypes.bool

}

export default injectIntl( upload )