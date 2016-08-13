import React, { PropTypes } from 'react'
import _ from 'underscore'
import tag from './tag'
import { globalAttr, ulAttr } from './attributes'

const ul = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, ulAttr ) )

	return(

		<ul { ...allowedProps } >{ children }</ul>

	)

}

ul.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default tag( ul )
