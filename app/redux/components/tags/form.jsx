import React, { PropTypes } from 'react'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, formAttr } from './attributes'

const form = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, formAttr ) )

	return(

		<form { ...allowedProps } >{ children }</form>

	)

}

form.propTypes = {

	hocProps: PropTypes.shape( { 

		acceptCharset: PropTypes.string,
		action: PropTypes.string.isRequired,
		autoComplete: PropTypes.oneOf( [ 'on', 'off' ] ),
		enctype: PropTypes.oneOf( [ 'application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain' ] ),
		method: PropTypes.oneOf( [ 'get', 'post' ] ),
		name: PropTypes.string,
		noValidate: PropTypes.bool,
		target: PropTypes.oneOf( [ '_blank', '_self', '_parent', '_top' ] ),

		id: PropTypes.string.isRequired
		
	} )

}

export default hoc( form )