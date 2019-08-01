import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, ulAttr } from './attributes'

const ul = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, ulAttr ) )

	return(

		<ul { ...allowedProps } >{ children }</ul>

	)

}

ul.propTypes = {

	hocProps: PropTypes.shape( { 
		children: PropTypes.node,
	} )

}

export default hoc( ul )
