import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, iAttr } from './attributes'

const i = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = pick( restProps, union( globalAttr, iAttr ) )


	return(

		<i { ...allowedProps } >{ children }</i>

	)

}

i.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( i )