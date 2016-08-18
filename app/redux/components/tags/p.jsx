import React, { PropTypes } from 'react'
import _ from 'underscore'
import tag from './tag'
import { globalAttr, pAttr } from './attributes'

const p = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, pAttr ) )

	return(

		<p { ...allowedProps } >{ children }</p>

	)

}

p.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default tag( p )