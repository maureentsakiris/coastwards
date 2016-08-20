import React, { PropTypes } from 'react'
import _ from 'underscore'
import tag from './tag'
import { globalAttr, iAttr } from './attributes'

const span = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, iAttr ) )


	return(

		<span { ...allowedProps } >{ children }</span>

	)

}

span.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default tag( span )