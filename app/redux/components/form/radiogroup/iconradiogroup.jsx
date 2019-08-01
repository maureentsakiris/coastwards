import React  from 'react'
import { PropTypes } from 'prop-types'
import { map } from 'underscore'
import hoc from 'components/form/hoc'
import DIV from 'components/tags/div'
import ICONRADIO from 'components/form/radiogroup/iconradio'

const iconradiogroup = ( { hocProps } ) => {

	const { form, name, options, selected, className, onChange } = hocProps
	const radios = _renderOptions( form, name, options, selected, onChange )

	return(

		<DIV className={ className } >
			{ radios }
		</DIV>

	)

}

const _renderOptions = ( form, name, options, selected, onChange ) => {

	return map( options, ( option, key ) => {

		let { label, value, color } = option

		let isSelected = selected == value ? true : false

		return React.createElement( ICONRADIO, {

			key: key,
			form: form, 
			label: label,
			name: name,
			value: value,
			onChange: onChange,
			selected: isSelected,
			color: color

		} )

	} )

}

iconradiogroup.propTypes = {

	hocProps: PropTypes.shape( {

		options: PropTypes.array.isRequired,
		selected: PropTypes.string,
		form: PropTypes.string,
		name: PropTypes.sting,
		className: PropTypes.string,
		
		onChange: PropTypes.func.isRequired

	} )

}

export default hoc( iconradiogroup )