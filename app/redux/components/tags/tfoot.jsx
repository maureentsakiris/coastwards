import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, tfootAttr } from './attributes'

const tfoot = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, tfootAttr ) )

	return(

		<tfoot { ...allowedProps } >{ children }</tfoot>

	)

}

tfoot.propTypes = {

	hocProps: PropTypes.shape( { 
		children: PropTypes.node,
	} )

}

export default hoc( tfoot )