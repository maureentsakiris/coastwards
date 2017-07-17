import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, sectionAttr } from './attributes'

const section = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, sectionAttr ) )

	return(

		<section { ...allowedProps } >{ children }</section>

	)

}

section.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( section )
