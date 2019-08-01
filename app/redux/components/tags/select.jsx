import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, selectAttr } from './attributes'

const select = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, selectAttr ) )

	return(

		<select { ...allowedProps } >{ children }</select>

	)

}

select.propTypes = {

	hocProps: PropTypes.shape( { 

		children: PropTypes.node,
		form: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
		
	} )

}

export default hoc( select )