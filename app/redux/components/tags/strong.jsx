import React, { PropTypes } from 'react'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, strongAttr } from './attributes'

const strong = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, strongAttr ) )

	return(

		<strong { ...allowedProps } >{ children }</strong>

	)

}

strong.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( strong )
