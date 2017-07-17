import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, divAttr } from './attributes'

const div = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, divAttr ) )

	return(

		<div { ...allowedProps } >{ children }</div>

	)

}

div.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( div )