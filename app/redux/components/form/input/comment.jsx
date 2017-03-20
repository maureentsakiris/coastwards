import React, { PropTypes } from 'react'

import hoc from 'components/form/hoc'
import TEXTAREA from 'components/tags/textarea'


const comment = ( { hocProps } ) => {

	const { form, name, placeholder, onChange } = hocProps

	return(

		<TEXTAREA form={ form } name={ name } placeholder={ placeholder } onChange={ onChange } />

	)
	
}

comment.propTypes = {

	hocProps: PropTypes.shape( {

		onChange: PropTypes.func,
		placeholder: PropTypes.string

	} )

}

export default hoc( comment )