import React, { PropTypes } from 'react'
import _ from 'underscore'
import tag from './tag'
import { globalAttr, labelAttr } from './attributes'

const label = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, labelAttr ) )

	return(

		<label { ...allowedProps } >{ children }</label>

	)

}

label.propTypes = {

	hocProps: PropTypes.shape( { 

		htmlFor: PropTypes.string.isRequired,
		form: PropTypes.string.isRequired
		
	} )

}

export default tag( label )