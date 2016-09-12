import React, { PropTypes } from 'react'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, smallAttr } from './attributes'

const small = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, smallAttr ) )

	return(

		<small { ...allowedProps } >{ children }</small>

	)

}

small.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( small )
