import React, { PropTypes } from 'react'

import hoc from 'components/form/hoc'
import INPUT from 'components/tags/input'

import validator from 'validator'


const hashtag = ( { hocProps } ) => {

	const { form, name, placeholder, onChange } = hocProps

	const validate = ( e ) => {

		let val = validator.blacklist( e.target.value, ' ' )

		if( val.indexOf( '#' ) !== 0 ){

			val = '#' + val

		}

		e.target.value = val.toLowerCase()
		
		onChange( e )

	}

	return(

		<INPUT type="text" form={ form } name={ name } placeholder={ placeholder } onChange={ validate } />

	)
	
}


hashtag.propTypes = {

	hocProps: PropTypes.shape( {

		onChange: PropTypes.func,
		placeholder: PropTypes.string

	} )

}

export default hoc( hashtag )
