import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, spanAttr } from './attributes'

const span = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, spanAttr ) )


	return(

		<span { ...allowedProps } >{ children }</span>

	)

}

span.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( span )