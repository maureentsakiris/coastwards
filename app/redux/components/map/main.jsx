import React from 'react'

import Errors from 'containers/main/errors'
import Mapbox from 'containers/main/mapbox'
import Popup from 'containers/main/popup'
import Loader from 'containers/main/loader'
import Legend from 'containers/main/legend'
import Credits from 'containers/main/credits'
import DIV from 'components/tags/div'


import style from '../main/_main'



const main = (  ) => {

	

	return(

		<DIV id="Main" className={ style.jazz } >
			<Mapbox className={ style.mapbox } />
			<Loader className={ style.screen } />
			<Errors className={ style.screen } />
			<Credits />
			<Legend />
			<Popup />
		</DIV>

	)
	
}


export default main