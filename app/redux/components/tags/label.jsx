import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, labelAttr } from './attributes'

const label = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, labelAttr ) )

	return(

		<label { ...allowedProps } >{ children }</label>

	)

}

label.propTypes = {

	hocProps: PropTypes.shape( { 

		children: PropTypes.node,
		htmlFor: PropTypes.string.isRequired,
		form: PropTypes.string.isRequired
		
	} )

}

export default hoc( label )