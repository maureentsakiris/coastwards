import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, olAttr } from './attributes'

const ol = ( { hocProps } ) => {

	const { children, ...restProps } = hocProps
	const allowedProps = _.pick( restProps, _.union( globalAttr, olAttr ) )

	return(

		<ol { ...allowedProps } >{ children }</ol>

	)

}

ol.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( ol )
