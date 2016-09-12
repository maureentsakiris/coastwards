import React, { PropTypes } from 'react'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, iAttr } from './attributes'

const i = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, iAttr ) )


	return(

		<i { ...allowedProps } >{ children }</i>

	)

}

i.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( i )