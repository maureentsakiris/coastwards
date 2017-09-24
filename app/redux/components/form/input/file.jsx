import React from 'react'
import { PropTypes } from 'prop-types'
import hoc from 'components/form/hoc'
import INPUT from 'components/tags/input'


const file = ( { hocProps } ) => {

	const { form, name, onChange, accept } = hocProps

	return(

		<INPUT type="file" form={ form } name={ name } onChange={ onChange } accept={ accept } />

	)
	
}

file.propTypes = {

	hocProps: PropTypes.shape( {

		onChange: PropTypes.func,
		accept: PropTypes.string


	} )

}

export default hoc( file )