import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, tdAttr } from './attributes'

const td = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, tdAttr ) )

	return(

		<td { ...allowedProps } >{ children }</td>

	)

}

td.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( td )