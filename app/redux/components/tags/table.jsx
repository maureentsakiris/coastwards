import React, { PropTypes } from 'react'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, tableAttr } from './attributes'

const table = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, tableAttr ) )

	return(

		<table { ...allowedProps } >{ children }</table>

	)

}

table.propTypes = {

	hocProps: PropTypes.shape( { 

		border: PropTypes.oneOf( [ 0, 1 ] )

	} )

}

export default hoc( table )