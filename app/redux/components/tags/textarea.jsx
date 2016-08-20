import React, { PropTypes } from 'react'
import _ from 'underscore'
import tag from './tag'
import { globalAttr, textareaAttr } from './attributes'

const textarea = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, textareaAttr ) )

	return(

		<textarea { ...allowedProps } >{ children }</textarea>

	)

}

textarea.propTypes = {

	hocProps: PropTypes.shape( { 

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

export default tag( textarea )