import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import _ from 'underscore'

import H from 'components/tags/h'
import FORM from 'components/tags/form'
import DIV from 'components/tags/div'
import INPUT from 'components/tags/input'

const messages = defineMessages( {

	unsupported:{
		id: "unsupported",
		description: "Warning - Warns the user that his browser does not support the image upload",
		defaultMessage: "Hmm sorry, your browser does not support the technologies used to upload images. Update your browser to the latest version and it should work. See ya there!?"
	},
	all_set:{
		id: "all_set",
		description: "Section header - All set?",
		defaultMessage: "Do you have any pictures of coasts on your device? Why not upload them now?"
	}

} )

const form = ( { intl, uploadSupported, valid, action, invalid, rejected, validateFiles } ) => {

	const { formatMessage } = intl
 
	const validList = _createList( valid, 'Valid' )
	const actionList = _createList( action, 'Action' )
	const invalidList = _createList( invalid, 'Invalid' )
	const rejectedList = _createList( rejected, 'Rejected' )

	return(

		<DIV id="Upload" >
			<H priority={ 2 }>{ formatMessage( messages.all_set ) }</H>
			{ !uploadSupported && <p>{ formatMessage( messages.unsupported ) }</p> }
			{ uploadSupported && <FORM action="#" id="upload">
				<INPUT id="images" name="images" onChange={ validateFiles } form="upload" type="file" multiple={ true }  />
				<canvas id="canvas" style={ { display: 'none' } } >canvas</canvas>
				<DIV id="Lists">
					{ validList }
					{ actionList }
					{ invalidList }
					{ rejectedList }
				</DIV>
			</FORM> }
		</DIV>

	)
	
}

const _createList = ( images, comp ) => {

	const list = _.map( images, ( image, index ) => {

		const style = image.status == 'valid' ? { color: 'green' } : image.status == 'action' ? { color: 'orange' } : image.status == 'invalid' ? { color: 'red' } : { color: 'grey' }

		/*return React.createElement( 'div', {

			key: index,
			children: image.preview,
			style: style

		} )*/

		return (

			<DIV>
				<img src={ image.dataURL } />
			</DIV>

		)

	} )

	return React.createElement( 'div', {

		id: comp,
		children: list

	} )

}

form.propTypes = {

	intl: intlShape.isRequired,
	uploadSupported: PropTypes.bool,
	rejected: PropTypes.array,
	valid: PropTypes.array,
	action: PropTypes.array,
	invalid: PropTypes.array,
	validateFiles: PropTypes.func

}

export default injectIntl( form )
