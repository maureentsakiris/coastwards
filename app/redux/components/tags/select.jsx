import React, { PropTypes } from 'react'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, selectAttr } from './attributes'

const select = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, selectAttr ) )

	return(

		<select { ...allowedProps } >{ children }</select>

	)

}

select.propTypes = {

	hocProps: PropTypes.shape( { 

		form: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired
		
	} )

}

export default hoc( select )