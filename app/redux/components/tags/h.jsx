import React, { PropTypes } from 'react'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, hAttr } from './attributes'

const h = ( { hocProps } ) => {

	const { children, priority, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, hAttr ) )

	const Tag = `h${ priority }`

	return(

		<Tag { ...allowedProps } >{ children }</Tag>

	)

}


h.propTypes = {

	hocProps: PropTypes.shape( {

		priority: PropTypes.number.isRequired

	} )

}

export default hoc( h )