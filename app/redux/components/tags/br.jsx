import React from 'react'
import { PropTypes } from 'prop-types'
import { pick, union } from 'underscore'
import hoc from './hoc'
import { globalAttr, brAttr } from './attributes'

const br = ( { hocProps } ) => {

	const allowedProps = pick( hocProps, union( globalAttr, brAttr ) )

	return(

		<br { ...allowedProps } />

	)

}

br.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( br )