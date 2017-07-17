import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, hrAttr } from './attributes'

const hr = ( { hocProps } ) => {

	const allowedProps = pick( hocProps, union( globalAttr, hrAttr ) )

	return(

		<hr { ...allowedProps } />

	)

}

hr.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( hr )