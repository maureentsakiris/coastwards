import React, { PropTypes } from 'react'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, sectionAttr } from './attributes'

const section = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, sectionAttr ) )

	return(

		<section { ...allowedProps } >{ children }</section>

	)

}

section.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( section )
