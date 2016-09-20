import React, { PropTypes } from 'react'
import Classnames from 'classnames'

import BUTTON from 'components/tags/button'

import style from './_button'


const submit = ( { form, name, label, className } ) => {

	const cls = Classnames( style.submit, className )

	return(

		<BUTTON type="submit" form={ form } name={ name } className={ cls } >{ label }</BUTTON>

	)
	
}

submit.propTypes = {

	form: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	className: PropTypes.string

}

export default submit
