import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, theadAttr } from './attributes'

const thead = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, theadAttr ) )

	return(

		<thead { ...allowedProps } >{ children }</thead>

	)

}

thead.propTypes = {

	hocProps: PropTypes.shape( { 
		children: PropTypes.node,
	} )

}

export default hoc( thead )