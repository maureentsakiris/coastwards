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
	select_images:{
		id: "select_images",
		description: "Status - Select your images",
		defaultMessage: "Select your images"
	}

} )

const upload = ( { intl, status, imagesValid, validateFiles } ) => {

	const { formatMessage } = intl

	const supported = Modernizr.xhr2 || Modernizr.xhrresponsetypejson

	const accepted = imagesValid.length > 0
	const validImages = accepted ? _createValidImagesList( imagesValid ) : ''

	if( !supported ){

		return( 

			<p>{ formatMessage( messages.unsupported ) }</p>

		)

	}else{

		return(

			<DIV id="Upload" >
				<P>!STATUS: { formatMessage( messages[ status ] ) }</P>
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
	validateFiles: PropTypes.func.isRequired

}

export default injectIntl( upload )