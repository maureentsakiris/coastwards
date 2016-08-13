import React, { PropTypes } from 'react'
import _ from 'underscore'
import tag from './tag'
import { globalAttr, liAttr } from './attributes'

const li = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, liAttr ) )


	return(

		<li { ...allowedProps } >{ children }</li>

	)

}

li.propTypes = {

	hocProps: PropTypes.shape( {

		value: PropTypes.number

	} )

}

export default tag( li )