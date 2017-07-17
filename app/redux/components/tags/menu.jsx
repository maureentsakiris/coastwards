import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, menuAttr } from './attributes'

const menu = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, menuAttr ) )

	return(

		<menu { ...allowedProps } >{ children }</menu>

	)

}

menu.propTypes = {

	hocProps: PropTypes.shape( { 

		label: PropTypes.string,
		type: PropTypes.oneOf( [ 'list', 'toolbar', 'context' ] )
		
	} )

}

export default hoc( menu )