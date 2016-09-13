import React, { PropTypes } from 'react'
import _ from 'underscore'

import hoc from 'components/form/hoc'
import DIV from 'components/tags/div'
import RADIO from 'components/form/radiogroup/radio'


const radiogroup = ( { hocProps } ) => {

	const { form, name, options, onClick } = hocProps

	const radios = _renderOptions( form, name, options, onClick )

	return(

		<DIV>
			{ radios }
		</DIV>

	)
	
}

const _renderOptions = ( form, name, options, onClick ) => {

	return _.map( options, ( option, key ) => {

		let { label, value } = option

		return React.createElement( RADIO, {

			key: key,
			form: form, 
			label: label,
			name: name,
			value: value,
			onClick: onClick

		} )

	} )

}

radiogroup.propTypes = {

	hocProps: PropTypes.shape( {

		onClick: PropTypes.func,
		options: PropTypes.array.isRequired

	} )

}

export default hoc( radiogroup )
