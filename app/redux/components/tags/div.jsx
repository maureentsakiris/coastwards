import React, { PropTypes } from 'react'
import _ from 'underscore'
import tag from './tag'
import { globalAttr, divAttr } from './attributes'

const div = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, divAttr ) )

	return(

		<div { ...allowedProps } >{ children }</div>

	)

}

div.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default tag( div )