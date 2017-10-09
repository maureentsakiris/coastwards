import React from 'react'
import { PropTypes } from 'prop-types'
import { map } from 'underscore'

import hoc from 'components/form/hoc'
import DIV from 'components/tags/div'
import RADIO from 'components/form/radiogroup/radio'


const radiogroup = ( { hocProps } ) => {

	const { className, form, name, options, selected, onChange } = hocProps

	const radios = _renderOptions( form, name, options, selected, onChange )

	return(

		<DIV className={ className } >
			{ radios }
		</DIV>

	)
	
}

const _renderOptions = ( form, name, options, selected, onChange ) => {

	return map( options, ( option, key ) => {

		let { label, value } = option
		let isSelected = value == selected ? true : false

		return React.createElement( RADIO, {

			key: key,
			form: form, 
			label: label,
			name: name,
			value: value,
			checked: isSelected,
			onChange: onChange

		} )

	} )

}

radiogroup.propTypes = {

	hocProps: PropTypes.shape( {

		options: PropTypes.array.isRequired,
		className: PropTypes.string,
		selected: PropTypes.string,

		onChange: PropTypes.func

	} )

}

export default hoc( radiogroup )