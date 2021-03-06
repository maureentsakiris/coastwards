import React from 'react'
import { PropTypes } from 'prop-types'
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
		placeholder: PropTypes.string,
		form: PropTypes.string,
		name: PropTypes.sting

	} )

}

export default hoc( email )