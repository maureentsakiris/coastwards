import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, thAttr } from './attributes'

const th = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, thAttr ) )

	return(

		<th { ...allowedProps } >{ children }</th>

	)

}

th.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( th )