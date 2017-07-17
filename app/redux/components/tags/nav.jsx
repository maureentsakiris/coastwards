import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, navAttr } from './attributes'

const nav = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, navAttr ) )

	return(

		<nav { ...allowedProps } >{ children }</nav>

	)

}

nav.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( nav )