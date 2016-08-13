import React, { PropTypes } from 'react'
import _ from 'underscore'
import tag from './tag'
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

export default tag( nav )