import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, optionAttr } from './attributes'

const option = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, optionAttr ) )

	return(

		<option { ...allowedProps } >{ children }</option>

	)

}

option.propTypes = {

	hocProps: PropTypes.shape( { 

		value: PropTypes.string.isRequired
		
	} )

}

export default hoc( option )