import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, tdAttr } from './attributes'

const td = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, tdAttr ) )

	return(

		<td { ...allowedProps } >{ children }</td>

	)

}

td.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( td )