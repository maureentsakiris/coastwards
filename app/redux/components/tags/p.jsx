import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, pAttr } from './attributes'

const p = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, pAttr ) )

	return(

		<p { ...allowedProps } >{ children }</p>

	)

}

p.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( p )