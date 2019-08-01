import React from 'react'
import { PropTypes } from 'prop-types'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import P from 'components/tags/p'
import IMG from 'components/tags/img'

import style from './_logos'

const messages = defineMessages( {

	project_by:{
		id: "project_by",
		description: "P - ",
		defaultMessage: "A project by"
	},
	legal_notice:{
		id: "legal_notice",
		description: "A - ",
		defaultMessage: "Imprint"
	},
	in_collaboration_with:{
		id: "in_collaboration_with",
		description: "A - ",
		defaultMessage: "In collaboration with"
	}

} )

const logos = ( { intl, jazzSupported } ) => {

	const { formatMessage } = intl

	if( !jazzSupported ){

		return(

			<DIV id="Logos" className={ style.noJazz } >
				<P>{ formatMessage( messages.project_by ) }</P>
				<A target="_blank" href="http://www.futureocean.org" ><IMG src="assets/Cluster-of-Excellence-The-Future-Ocean.jpg" alt="Cluster of Excellence The Future Ocean" /></A>
				<A target="_blank" href="https://www.uni-kiel.de" ><IMG src="assets/Christian-Albrechts-Universitat-zu-Kiel.png" alt="Christian Albrechts Universität zu Kiel" /></A>
				<A target="_blank" href="http://www.crslr.uni-kiel.de" ><IMG src="assets/Coastal-Risks-And-Sea-Level-Rise-Research-Group.png" alt="Coastal Risks and Sea-Level Rise Research Group" /></A>

				<P className={ style.collaboration }>{ formatMessage( messages.in_collaboration_with ) }</P>
				<A target="_blank" href="http://www.cerema.fr/" ><IMG src="assets/cerema.jpg" alt="Cerema" /></A>
			</DIV>

		)

	}else{

		return (

			<DIV id="Logos" className={ style.jazz } >
				<P>{ formatMessage( messages.project_by ) }</P>
				<A target="_blank" href="http://www.futureocean.org" ><IMG src="assets/Cluster-of-Excellence-The-Future-Ocean.jpg" alt="Cluster of Excellence The Future Ocean" /></A>
				<A target="_blank" href="https://www.uni-kiel.de" ><IMG src="assets/Christian-Albrechts-Universitat-zu-Kiel.png" alt="Christian Albrechts Universität zu Kiel" /></A>
				<A target="_blank" href="http://www.crslr.uni-kiel.de" ><IMG src="assets/Coastal-Risks-And-Sea-Level-Rise-Research-Group.png" alt="Coastal Risks and Sea-Level Rise Research Group" /></A>

				<P className={ style.collaboration } >{ formatMessage( messages.in_collaboration_with ) }</P>
				<A target="_blank" href="http://www.cerema.fr/" ><IMG src="assets/cerema.jpg" alt="Cerema" /></A>
			</DIV>

		)

	}

}

logos.propTypes = {

	intl: intlShape.isRequired,
	jazzSupported: PropTypes.bool

}

export default injectIntl( logos )