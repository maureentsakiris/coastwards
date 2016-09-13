import React, { PropTypes } from 'react'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, thAttr } from './attributes'

const th = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, thAttr ) )

	return(

		<th { ...allowedProps } >{ children }</th>

	)

}

th.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( th )