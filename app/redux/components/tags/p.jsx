import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, pAttr } from './attributes'

const p = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, pAttr ) )

	return(

		<p { ...allowedProps } >{ children }</p>

	)

}

p.propTypes = {

	hocProps: PropTypes.shape( { 
		children: PropTypes.node,
	} )

}

export default hoc( p )