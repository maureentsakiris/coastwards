import React from 'react'
import { PropTypes } from 'prop-types'
import { map } from 'underscore'

import hoc from 'components/form/hoc'
import DIV from 'components/tags/div'
import RADIO from 'components/form/radiogroup/radio'


const radiogroup = ( { hocProps } ) => {

	const { form, name, options, checked, onChange, className, controlled } = hocProps

	const radios = _renderOptions( form, name, options, checked, onChange, controlled )

	return(

		<DIV className={ className } >
			{ radios }
		</DIV>

	)
	
}

const _renderOptions = ( form, name, options, checked, onChange, controlled ) => {

	return map( options, ( option, key ) => {

		let { label, value } = option
		let isChecked = value == checked ? true : false

		return React.createElement( RADIO, {

			key: key,
			form: form, 
			label: label,
			name: name,
			value: value,
			onChange: onChange,
			isChecked: isChecked,
			controlled: controlled

		} )

	} )

}

radiogroup.propTypes = {

	hocProps: PropTypes.shape( {

		onChange: PropTypes.func,
		options: PropTypes.array.isRequired,
		className: PropTypes.string,
		controlled: PropTypes.bool

	} )

}

export default hoc( radiogroup )