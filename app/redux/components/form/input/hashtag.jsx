import React, { PropTypes } from 'react'

import hoc from 'components/form/hoc'
import INPUT from 'components/tags/input'


const hashtag = ( { hocProps } ) => {

	const { form, name, placeholder, onChange } = hocProps

	const validate = ( e ) => {

		let val = e.target.value.replace( /[^0-9a-z]/gi, '' )
		if( val.indexOf( '#' ) !== 0 ){

			val = '#' + val

		}
		e.target.value = val

		onChange( e )


	}

	return(

		<INPUT type="text" form={ form } name={ name } placeholder={ placeholder } onChange={ validate } />

	)
	
}


hashtag.propTypes = {

	hocProps: PropTypes.shape( {

		placeholder: PropTypes.string,

		onChange: PropTypes.func

	} )

}

export default hoc( hashtag )
