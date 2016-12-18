import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'
import BR from 'components/tags/br'

import style from './_definematerial'


const messages = defineMessages( {

	definematerial_header:{
		id: "definematerial_header",
		description: "Header - What do you mean by 'coast material'?",
		defaultMessage: "What do you mean by 'coast material'?"
	},
	the_obvious_header:{
		id: "the_obvious_header",
		description: "P - ",
		defaultMessage: "The stuff the coast is made of."
	},
	the_obvious_text:{
		id: "the_obvious_text",
		description: " - ",
		defaultMessage: "If you were water from the ocean or sea, which material would you first encounter? Hard rock from a cliff or a sand from a beach? Or maybe something man-made like a concrete wall? The coast material is the stuff you find in the first meters on land."
	},
	multiple_materials_header:{
		id: "multiple_materials_header",
		description: " - ",
		defaultMessage: "What if the coast is made of more than just one material?"
	},
	multiple_materials_text:{
		id: "multiple_materials_text",
		description: " - ",
		defaultMessage: "In that case, choose the material that predominates."
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
	}

} )


const definematerial = ( { intl, className } ) => {

	const { formatMessage } = intl

	return(

		<DIV className={ className } >
			<H priority={ 2 }>{ formatMessage( messages.the_obvious_header ) }</H>
			<P>{ formatMessage( messages.the_obvious_text ) }</P>
			<BR/>
			<TOGGLE priority={ 3 } text={ formatMessage( messages.multiple_materials_header ) } className={ style.toggle } style={ { border: 'none' } } >
				<P>{ formatMessage( messages.multiple_materials_text ) }</P>
			</TOGGLE>
			<TOGGLE priority={ 3 } text={ formatMessage( messages.material_examples_header ) } className={ style.toggle } >
				<P>{ formatMessage( messages.material_examples_text ) }</P>
			</TOGGLE>
		</DIV>

	)

}

definematerial.propTypes = {

	intl: intlShape,
	className: PropTypes.string

}

export default injectIntl ( definematerial )
