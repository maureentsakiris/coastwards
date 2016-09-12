import React, { PropTypes } from 'react'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, inputAttr } from './attributes'

const input = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, inputAttr ) )

	return(

		<input { ...allowedProps } >{ children }</input>

	)

}

input.propTypes = {

	hocProps: PropTypes.shape( { 

		accept: PropTypes.string,
		alt: PropTypes.string,
		autoComplete: PropTypes.oneOf( [ 'on', 'off' ] ),
		autoFocus: PropTypes.bool,
		checked: PropTypes.bool,
		dirname: PropTypes.string,
		disabled: PropTypes.bool,
		form: PropTypes.string.isRequired,
		formaction: PropTypes.string,
		formenctype: PropTypes.oneOf( [ 'application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain' ] ),
		formmethod: PropTypes.oneOf( [ 'get', 'post' ] ),
		formnovalidate: PropTypes.bool,
		formtarget: PropTypes.oneOf( [ '_blank', '_self', '_parent', '_top' ] ),
		height: PropTypes.number,
		list: PropTypes.string,
		max: PropTypes.string, //can also be a date
		maxlength: PropTypes.number,
		min: PropTypes.string,
		multiple: PropTypes.bool,
		name: PropTypes.string.isRequired,
		pattern: PropTypes.string,
		placeholder: PropTypes.string,
		readonly: PropTypes.bool,
		required: PropTypes.bool,
		size: PropTypes.number,
		src: PropTypes.string,
		step: PropTypes.string,
		type: PropTypes.oneOf( [ 'button', 'checkbox', 'color', 'date', 'datetime', 'datetime-local', 'email', 'file', 'hidden', 'image', 'month', 'number', 'password', 'radio', 'range', 'reset', 'search', 'submit', 'tel', 'text', 'time', 'url', 'week' ] ),
		value: PropTypes.string,
		width: PropTypes.number

		
	} )

}

export default hoc( input )