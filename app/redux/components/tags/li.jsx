import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, liAttr } from './attributes'

const li = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, liAttr ) )


	return(

		<li { ...allowedProps } >{ children }</li>

	)

}

li.propTypes = {

	hocProps: PropTypes.shape( {

		children: PropTypes.node,
		value: PropTypes.number

	} )

}

export default hoc( li )