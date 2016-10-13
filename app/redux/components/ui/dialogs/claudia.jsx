import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'


const messages = defineMessages( {

	claudia_header:{
		id: "claudia_header",
		description: "Header - Browser support",
		defaultMessage: "Claudia Wolff"
	},
	claudia_text:{
		id: "claudia_text",
		description: "P - ",
		defaultMessage: "Claudia studied Environmental Geography and Management at the University of Kiel. Her studies include the minors 'Oceanography' and 'Hydrology'. Claudia joined the CRLSR group in March 2011 as a scientific assistant and has started her PhD in April 2015. Her main research focus lies on the assessment of coastal impacts to sea-level rise at global to sub-national scale. She is particularly interested in the effects of scale and input data on modelling impacts to sea-level rise. Further, Claudia is involved in the development of the global coastal database that underpins the Dynamic Interactive Vulnerability Assessment (DIVA) modelling framework and is involved in several application of the DIVA model at various scales."
	},
	publications:{
		id: "publications",
		description: "Header - ",
		defaultMessage: "Publications"
	}
	

} )


const claudia = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<DIV>
			<H priority={ 2 }>{ formatMessage( messages.claudia_header ) }</H>
			<P>{ formatMessage( messages.claudia_text ) }</P>
			<H priority={ 3 }>{ formatMessage( messages.publications ) }</H>
			<P>Wolff, C., Vafeidis, A.T., Lincke, D., Marasmi, C., and Hinkel, J. (2016). Effects of scale and input data on assessing the future impacts of coastal flooding: An application of DIVA for the Emilia-Romagna coast. Frontiers in Marine Science 3.</P>
		</DIV>

	)

}

claudia.propTypes = {

	intl: intlShape,
	component: PropTypes.node,
	active: PropTypes.bool,
	closeDialog: PropTypes.func

}

export default injectIntl ( claudia )
