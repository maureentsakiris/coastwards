import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, trAttr } from './attributes'

const tr = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, trAttr ) )

	return(

		<tr { ...allowedProps } >{ children }</tr>

	)

}

tr.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( tr )