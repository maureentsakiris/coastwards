import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import _ from 'underscore'

import TOGGLE from 'components/ui/toggle'
import EXAMPLE from 'containers/ui/dialogs/example'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'
import BR from 'components/tags/br'

import style from './_definematerial'


const messages = defineMessages( {

	the_obvious_header:{
		id: "the_obvious_header",
		description: "P - ",
		defaultMessage: "The stuff the coast is made of."
	},
	the_obvious_text:{
		id: "the_obvious_text",
		description: " - ",
		defaultMessage: "If you were water from the ocean or sea, which material would you first encounter? Hard rock from a cliff or a sand from a beach? Or maybe something man-made like a concrete wall? The coast material is the stuff you find in the first meters of land."
	},
	multiple_materials_header:{
		id: "multiple_materials_header",
		description: " - ",
		defaultMessage: "What if the coast is made of more than just one material?"
	},
	multiple_materials_text:{
		id: "multiple_materials_text",
		description: " - ",
		defaultMessage: "In that case, it's the material that predominates."
	},
	material_examples_header:{
		id: "material_examples_header",
		description: " - ",
		defaultMessage: "Show me some examples!"
	},
	material_examples_text:{
		id: "material_examples_text",
		description: " - ",
		defaultMessage: "I'm currently working on this section. Until then, have a look at the images that are already uploaded to get a better idea!"
	},

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
	}

} )


const definematerial = ( { intl, className, materials } ) => {

	const { formatMessage } = intl

	const getColor = ( material ) => {

		const obj = _.findWhere( materials, { value: material } )
		return obj.color

	}

	return(

		<DIV className={ className } >
			<H priority={ 2 }>{ formatMessage( messages.the_obvious_header ) }</H>
			<P>{ formatMessage( messages.the_obvious_text ) }</P>
			<BR/>
			<TOGGLE priority={ 3 } text={ formatMessage( messages.multiple_materials_header ) } className={ style.toggle } style={ { border: 'none' } } >
				<P>{ formatMessage( messages.multiple_materials_text ) }</P>
			</TOGGLE>
			<TOGGLE priority={ 3 } text={ formatMessage( messages.material_examples_header ) } className={ style.toggle } >
				<H priority={ 4 } className={ style.typeHeader } style={ { color: getColor( 'sand' ) } } >{ formatMessage( messages.sand ) }</H>
				<EXAMPLE type="sand" />

				<H priority={ 4 } className={ style.typeHeader } style={ { color: getColor( 'pebble' ) } } >{ formatMessage( messages.pebble ) }</H>
				<EXAMPLE type="pebble" />

				<H priority={ 4 } className={ style.typeHeader } style={ { color: getColor( 'rock' ) } } >{ formatMessage( messages.rock ) }</H>
				<EXAMPLE type="rock" />

				<H priority={ 4 } className={ style.typeHeader } style={ { color: getColor( 'mud' ) } } >{ formatMessage( messages.mud ) }</H>
				<EXAMPLE type="mud" />

				<H priority={ 4 } className={ style.typeHeader } style={ { color: getColor( 'ice' ) } } >{ formatMessage( messages.ice ) }</H>
				<EXAMPLE type="ice" />

				<H priority={ 4 } className={ style.typeHeader } style={ { color: getColor( 'manmade' ) } } >{ formatMessage( messages.manmade ) }</H>
				<EXAMPLE type="manmade" />
			</TOGGLE>
		</DIV>

	)

}

definematerial.propTypes = {

	intl: intlShape,
	className: PropTypes.string,
	materials: PropTypes.array

}

export default injectIntl ( definematerial )
