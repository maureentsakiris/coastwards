import React, { PropTypes } from 'react'
import _ from 'underscore'

import hoc from 'components/form/hoc'
import DIV from 'components/tags/div'
import ICONRADIO from 'components/form/radiogroup/iconradio'

const iconradiogroup = ( { hocProps } ) => {

	const { form, name, options, checkedValue, className, onClick } = hocProps
	const radios = _renderOptions( form, name, options, checkedValue, onClick )

	return(

		<DIV className={ className } >
			{ radios }
		</DIV>

	)

}

const _renderOptions = ( form, name, options, checkedValue, onClick ) => {

	return _.map( options, ( option, key ) => {

		let { label, value, color } = option
		let checked = checkedValue == value ? true : false

		return React.createElement( ICONRADIO, {

			key: key,
			form: form, 
			label: label,
			name: name,
			value: value,
			onClick: onClick,
			checked: checked,
			backgroundColor: color

		} )

	} )

}

iconradiogroup.propTypes = {

	hocProps: PropTypes.shape( {

		form: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,

		onClick: PropTypes.func,
		options: PropTypes.array.isRequired,
		className: PropTypes.string,
		defaultChecked: PropTypes.bool,

		checkedValue: PropTypes.string

	} )

}

export default hoc( iconradiogroup )