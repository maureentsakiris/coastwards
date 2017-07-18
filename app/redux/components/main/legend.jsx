import React from 'react'
import { PropTypes } from 'prop-types'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import { chain, map } from 'underscore'
import Classnames from 'classnames'

import Counter from 'containers/main/counter'

import DIV from 'components/tags/div'
import SPAN from 'components/tags/span'

import style from './_legend'


const messages = defineMessages( {

	//materials <--> popup.jsx
	sand:{
		id: "sand",
		description: "Material - Sand",
		defaultMessage: "Sand"
	},
	pebble:{
		id: "pebble",
		description: "Material - Pebble",
		defaultMessage: "Pebble"
	},
	rock:{
		id: "rock",
		description: "Material - Rock",
		defaultMessage: "Rock"
	},
	mud:{
		id: "mud",
		description: "Material - Mud",
		defaultMessage: "Mud"
	},
	manmade:{
		id: "manmade",
		description: "Material - Man-made",
		defaultMessage: "Man-made"
	},
	ice:{
		id: "ice",
		description: "Material - Ice",
		defaultMessage: "Ice"
	},
	notsure:{
		id: "notsure",
		description: "Material - Not sure",
		defaultMessage: "Not sure"
	},
	notset:{
		id: "notset",
		description: "Material - Not set",
		defaultMessage: "undefined"
	},
	notclose:{
		id: "notclose",
		description: " - ",
		defaultMessage: "Not close enough"
	}

} )

const legend = ( { intl, className, show, materials } ) => {

	const { formatMessage } = intl

	const mats = chain( materials )
		.filter( ( material ) => {

			let { value } = material
			return value !== 'notset'

		} )
		.filter( ( material ) => {

			let { value } = material
			return value !== 'notclose'

		} )
		.filter( ( material ) => {

			let { value } = material
			return value !== 'notsure'

		} )
		.map( ( material ) => {

			let { value, color } = material
			return { label: formatMessage( messages[ value ] ), value: value, color: color }

		} )
		.value()


	const clsLegend = Classnames( className, style.legend, {

		[ style.show ]: show

	} )


	const matLegend = _renderMaterials( mats )

	return(

		<DIV className={ clsLegend } dir="ltr">
			<DIV className={ style.materials } >{ matLegend }</DIV>
			<Counter />
		</DIV>

	)
	
}

const _renderMaterials = ( mats ) => {

	return map( mats, ( mat, key ) => {

		let { label, color } = mat

		return (

			<SPAN key={ key } className={ style.material } ><SPAN className={ style.dot } style={ { backgroundColor: color } }></SPAN>{ label }</SPAN>

		)

	} )

}


legend.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string,
	show: PropTypes.bool,

	materials: PropTypes.array

}

export default injectIntl( legend )