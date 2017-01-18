import React, { PropTypes } from 'react'

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import P from 'components/tags/p'
import IMG from 'components/tags/img'

import style from './_logos'


const logos = ( { showDialog } ) => {

	return(

		<DIV className={ style.logos }>
			<P>
				<A target="_blank" href="http://www.futureocean.org"><IMG src="assets/Cluster-of-Excellence-The-Future-Ocean.jpg" alt="Cluster of Excellence The Future Ocean" /></A>
				<A target="_blank" href="https://www.uni-kiel.de"><IMG src="assets/Christian-Albrechts-Universitat-zu-Kiel.png" alt="Christian Albrechts Universität zu Kiel" /></A>
				<A target="_blank" href="http://www.crslr.uni-kiel.de"><IMG src="assets/Coastal-Risks-And-Sea-Level-Rise-Research-Group.png" alt="Coastal Risks and Sea-Level Rise Research Group" /></A>
			</P>
			<A className={ style.imprint } href="#" onClick={ showDialog.bind( this, 'IMPRINT' ) }>Impressum</A>
		</DIV>
	)

}

logos.propTypes = {

	showDialog: PropTypes.func

}

export default logos 