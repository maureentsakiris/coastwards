import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'


const messages = defineMessages( {

	

} )

const file = ( { intl, f } ) => {

	const { formatMessage } = intl

	return(

		<div style={ { marginBottom: '10px' } } >
			<img style={ { width: '200px' } } src={ f.preview } />
		</div>

	)

}

file.propTypes = {

	intl: intlShape.isRequired,
	f: PropTypes.object.isRequired

}

export default injectIntl( file )