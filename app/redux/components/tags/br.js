import React, { PropTypes } from 'react'
import _ from 'underscore'
import hoc from './hoc'
import { globalAttr, brAttr } from './attributes'

const br = ( { hocProps } ) => {

	const allowedProps = _.pick( hocProps, _.union( globalAttr, brAttr ) )

	return(

		<br { ...allowedProps } />

	)

}

br.propTypes = {

	hocProps: PropTypes.shape( { } )

}

export default hoc( br )