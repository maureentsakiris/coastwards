import React, { PropTypes } from 'react'
import _ from 'underscore'
import tag from './tag'
import { globalAttr, hrAttr } from './attributes'

const hr = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, hrAttr ) )


	return(

		<hr { ...allowedProps } >{ children }</hr>

	)

}

hr.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default tag( hr )