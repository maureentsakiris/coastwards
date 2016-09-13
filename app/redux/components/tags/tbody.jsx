import React, { PropTypes } from 'react'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, tbodyAttr } from './attributes'

const tbody = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, tbodyAttr ) )

	return(

		<tbody { ...allowedProps } >{ children }</tbody>

	)

}

tbody.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( tbody )