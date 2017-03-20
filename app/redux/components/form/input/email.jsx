import React, { PropTypes } from 'react'

import hoc from 'components/form/hoc'
import INPUT from 'components/tags/input'


const email = ( { hocProps } ) => {

	const { form, name, placeholder, onChange } = hocProps

	return(

		<INPUT type="email" form={ form } name={ name } placeholder={ placeholder } onChange={ onChange } />

	)
	
}

email.propTypes = {

	hocProps: PropTypes.shape( {

		onChange: PropTypes.func,
		placeholder: PropTypes.string

	} )

}

export default hoc( email )