import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, theadAttr } from './attributes'

const thead = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, theadAttr ) )

	return(

		<thead { ...allowedProps } >{ children }</thead>

	)

}

thead.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( thead )