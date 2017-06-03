import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, buttonAttr } from './attributes'

const button = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, buttonAttr ) )

	return(

		<button { ...allowedProps } >{ children }</button>

	)

}

button.propTypes = {

	hocProps: PropTypes.shape( { } ),
	autoFocus: PropTypes.bool,
	disabled: PropTypes.bool,
	form: PropTypes.string,
	formaction: PropTypes.string,
	formenctype: PropTypes.oneOf( [ 'application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain' ] ),
	formmethod: PropTypes.oneOf( [ 'get', 'post' ] ),
	formnovalidate: PropTypes.bool,
	formtarget: PropTypes.oneOf( [ '_blank', '_self', '_parent', '_top' ] ),
	name: PropTypes.string,
	type: PropTypes.oneOf( [ 'button', 'reset', 'submit' ] ),
	value: PropTypes.string

}

export default hoc( button )