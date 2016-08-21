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

const form = ( { intl, valid, action, invalid, rejected, validateFiles } ) => {

	const { formatMessage } = intl
	const formData = Modernizr.xhr2 || Modernizr.xhrresponsetypejson
 
	if( !formData ){

		return( 

			<p>{ formatMessage( messages.unsupported ) }</p>

		)

	}else{


		/*const accepted = valid.length > 0
		const validImages = accepted ? _createValidImagesList( valid ) : ''*/

		const validList = _createList( valid, 'Valid' )
		const actionList = _createList( action, 'Action' )
		const invalidList = _createList( invalid, 'Invalid' )
		const rejectedList = _createList( rejected, 'Rejected' )

		return(

			<DIV id="Upload" >
				<FORM action="#" id="upload">
					<INPUT name="images" onChange={ validateFiles } form="upload" type="file" multiple={ true }  />
					<DIV id="Lists">
						{ validList }
						{ actionList }
						{ invalidList }
						{ rejectedList }
					</DIV>
				</FORM>
			</DIV>

		)

	}

}

const _createList = ( images, comp ) => {

	const list = _.map( images, ( image, index ) => {

		const style = image.status == 'valid' ? { color: 'green' } : image.status == 'action' ? { color: 'orange' } : image.status == 'invalid' ? { color: 'red' } : { color: 'grey' }

		return React.createElement( 'div', {

			key: index,
			children: image.name,
			style: style

		} )

	} )

	return React.createElement( 'div', {

		id: comp,
		children: list

	} )

}

form.propTypes = {

	intl: intlShape.isRequired,
	rejected: PropTypes.array,
	valid: PropTypes.array,
	action: PropTypes.array,
	invalid: PropTypes.array,
	validateFiles: PropTypes.func

}

export default injectIntl( form )
