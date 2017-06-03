import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, tfootAttr } from './attributes'

const tfoot = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, tfootAttr ) )

	return(

		<tfoot { ...allowedProps } >{ children }</tfoot>

	)

}

tfoot.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( tfoot )