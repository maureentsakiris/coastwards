import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Modernizr from 'modernizr'
import _ from 'underscore'

import FORM from 'components/tags/form'
import DIV from 'components/tags/div'
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

const upload = ( { intl, filesAccepted, acceptFiles } ) => {

	const { formatMessage } = intl
	const formData = Modernizr.xhr2 || Modernizr.xhrresponsetypejson
 
	if( !formData ){

		return( 

			<p>{ formatMessage( messages.unsupported ) }</p>

		)

	}else{

		const accepted = filesAccepted.length > 0
		const validImages = accepted ? _createValidImagesList( filesAccepted ) : ''

		return(

			<DIV id="Upload" >
				<FORM action="#" id="upload">
					{ !accepted && <INPUT name="images" onChange={ acceptFiles } form="upload" type="file" multiple={ false } /> }
					{ validImages }
				</FORM>
			</DIV>

		)

	}

}

const _createValidImagesList = ( filesAccepted ) => {

	return _.map( filesAccepted, ( file, index ) => {

		return React.createElement( FILE, {

			key: index,
			f: file

		} )

	} )

}

upload.propTypes = {

	intl: intlShape.isRequired,
	filesAccepted: PropTypes.array,
	filesRejected: PropTypes.array,
	acceptFiles: PropTypes.func

}

export default injectIntl( upload )
