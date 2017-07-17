import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, tbodyAttr } from './attributes'

const tbody = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, tbodyAttr ) )

	return(

		<tbody { ...allowedProps } >{ children }</tbody>

	)

}

tbody.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( tbody )