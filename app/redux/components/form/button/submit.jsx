import React, { PropTypes } from 'react'

import BUTTON from 'components/tags/button'

import style from './_button'


const submit = ( { form, name, label } ) => {

	return(

		<BUTTON type="submit" form={ form } name={ name } className={ style.submit } >{ label }</BUTTON>

	)
	
}

submit.propTypes = {

	form: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired

}

export default submit
