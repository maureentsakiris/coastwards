import React, { PropTypes } from 'react'
import _ from 'underscore'
import tag from './tag'
import { globalAttr, hrAttr } from './attributes'

const hr = ( { hocProps } ) => {

	const allowedProps = _.pick( hocProps, _.union( globalAttr, hrAttr ) )

	return(

		<hr { ...allowedProps } />

	)

}

hr.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default tag( hr )