import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Modernizr from 'modernizr'
import _ from 'underscore'

import DIV from 'components/tags/div'
import P from 'components/tags/p'
import INPUT from 'components/tags/input'

import FILE from 'components/file'

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
	},
	error_no_files_accepted:{
		id: "error_no_files_accepted",
		description: "Status - Informs user that none of the selected images were accepted",
		defaultMessage: "None of the selected files have the right file type. Please select images."
	},
	error_no_images_valid:{
		id: "error_no_images_valid",
		description: "Status - Informs user that none of the selected images is valid",
		defaultMessage: "None of the selected images have passed the tests."
	}

} )

const upload = ( { intl, status, filesAccepted, acceptFiles } ) => {

	const { formatMessage } = intl
	const supported = Modernizr.xhr2 || Modernizr.xhrresponsetypejson
	const accepted = filesAccepted.length > 0

	const filesAcceptedList = _createFilesAcceptedList( filesAccepted )

	if( !supported ){

		return( 

			<p>{ formatMessage( messages.unsupported ) }</p>

		)

	}else{

		return(

			<DIV id="upload" >
				<P>STATUS: { formatMessage( messages[ status ] ) }</P>
				{ !accepted && <INPUT onChange={ acceptFiles } form="upload" type="file" multiple={ true } /> }
				{ accepted && <DIV>{ filesAcceptedList }</DIV> }
			</DIV>

		)

	}

}

const _createFilesAcceptedList = ( filesAccepted ) => {

	return _.map( filesAccepted, ( file, index ) => {

		return React.createElement( FILE, {

			key: index,
			f: file

		} )

	} )

}

/*const _createFilesRejectedList = ( filesRejected ) => {

	return _.map( filesRejected, ( file, index ) => {

		return (

			<p key={ index } >{ file.name }</p>

		)

	} )

}*/

upload.propTypes = {

	intl: intlShape.isRequired,
	status: PropTypes.string,
	filesAccepted: PropTypes.array,
	filesRejected: PropTypes.array,
	acceptFiles: PropTypes.func.isRequired

}

export default injectIntl( upload )