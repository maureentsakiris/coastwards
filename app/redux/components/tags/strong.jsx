import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, strongAttr } from './attributes'

const strong = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, strongAttr ) )

	return(

		<strong { ...allowedProps } >{ children }</strong>

	)

}

strong.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( strong )
