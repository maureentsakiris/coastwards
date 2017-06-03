import React from 'react'
import { PropTypes } from 'prop-types'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, hrAttr } from './attributes'

const hr = ( { hocProps } ) => {

	const allowedProps = _.pick( hocProps, _.union( globalAttr, hrAttr ) )

	return(

		<hr { ...allowedProps } />

	)

}

hr.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( hr )