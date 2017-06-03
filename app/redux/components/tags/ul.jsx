import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'underscore'
import hoc from './hoc'
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

export default hoc( ul )
