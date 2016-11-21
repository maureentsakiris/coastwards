import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'


const messages = defineMessages( {

	joern_header:{
		id: "joern_header",
		description: "Header",
		defaultMessage: "Jörn Schmidt"
	},
	joern_text:{
		id: "joern_text",
		description: "P - ",
		defaultMessage: "The overarching goal of my current personal project is the use of interdisciplinary approaches, integrating natural science, social science and arts, and transdicsciplinary approaches, expanding the peer review group to stakeholders and the general public, to improve the understanding of maritime systems, with a focus on fisheries. This includes integrated ecological-economic modelling, social network analysis and exploring the possibilities of games for education and stakeholder participation. I already co-developed a game on the common pool problem in fisheries, the ecoOcean game (http://www.ecoocean.de and http://game.ecoocean.de/game/)."
	}

} )


const joern = ( { intl, className } ) => {

	const { formatMessage } = intl

	return(

		<DIV className={ className } >
			<H priority={ 2 }>{ formatMessage( messages.joern_header ) }</H>
			<P>{ formatMessage( messages.joern_text ) }</P> 
		</DIV>

	)

}  

joern.propTypes = {

	intl: intlShape,
	className: PropTypes.string

}

export default injectIntl ( joern )
