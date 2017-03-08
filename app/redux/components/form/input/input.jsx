import React, { PropTypes } from 'react'

import hoc from 'components/form/hoc'
import INPUT from 'components/tags/input'


const input = ( { hocProps } ) => {

	const { form, name, placeholder, onChange } = hocProps

	return(

		<INPUT type="text" form={ form } name={ name } placeholder={ placeholder } onChange={ onChange } />

	)
	
}


input.propTypes = {

	hocProps: PropTypes.shape( {

		placeholder: PropTypes.string,

		onChange: PropTypes.func

	} )

}

export default hoc( input )
