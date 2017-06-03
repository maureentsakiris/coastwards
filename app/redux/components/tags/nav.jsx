import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, navAttr } from './attributes'

const nav = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, navAttr ) )

	return(

		<nav { ...allowedProps } >{ children }</nav>

	)

}

nav.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( nav )