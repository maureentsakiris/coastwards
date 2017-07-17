import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, hAttr } from './attributes'

const h = ( { hocProps } ) => {

	const { children, priority, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, hAttr ) )

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