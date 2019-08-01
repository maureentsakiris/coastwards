import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, textareaAttr } from './attributes'

const textarea = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, textareaAttr ) )

	return(

		<textarea { ...allowedProps } >{ children }</textarea>

	)

}

textarea.propTypes = {

	hocProps: PropTypes.shape( { 

		children: PropTypes.node,
		autoFocus: PropTypes.bool,
		cols: PropTypes.number, 
		dirname: PropTypes.string,
		disabled: PropTypes.bool,
		form: PropTypes.string.isRequired,
		maxlength: PropTypes.number,
		name: PropTypes.string.isRequired,
		placeholder: PropTypes.string,
		readonly: PropTypes.bool,
		required: PropTypes.bool,
		rows: PropTypes.number, 
		wrap: PropTypes.oneOf( [ 'hard', 'soft' ] )

	} )

}

export default hoc( textarea )