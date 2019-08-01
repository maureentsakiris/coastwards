import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, smallAttr } from './attributes'

const small = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, smallAttr ) )

	return(

		<small { ...allowedProps } >{ children }</small>

	)

}

small.propTypes = {

	hocProps: PropTypes.shape( { 
		children: PropTypes.node,
	} )

}

export default hoc( small )
