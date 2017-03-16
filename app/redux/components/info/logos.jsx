import React, { PropTypes } from 'react'
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

} )

const logos = ( { intl, showDialog } ) => {

	const { formatMessage } = intl

	/*<P>{ formatMessage( messages.project_by ) } | <A onClick={ showDialog.bind( this, 'IMPRINT' ) }>{ formatMessage( messages.legal_notice ) }</A></P>
				<P>

				</P>*/

	return(

		<DIV className={ style.logos }>
			<DIV className={ style.box }>
				<DIV className={ style.links }>
					<A target="_blank" href="http://www.futureocean.org"><IMG src="assets/Cluster-of-Excellence-The-Future-Ocean.jpg" alt="Cluster of Excellence The Future Ocean" /></A>
					<A target="_blank" href="https://www.uni-kiel.de"><IMG src="assets/Christian-Albrechts-Universitat-zu-Kiel.png" alt="Christian Albrechts Universität zu Kiel" /></A>
					<A target="_blank" href="http://www.crslr.uni-kiel.de"><IMG src="assets/Coastal-Risks-And-Sea-Level-Rise-Research-Group.png" alt="Coastal Risks and Sea-Level Rise Research Group" /></A>
				</DIV>
			</DIV>
		</DIV>
	)

}

logos.propTypes = {

	intl: intlShape.isRequired,
	showDialog: PropTypes.func

}

export default injectIntl( logos )