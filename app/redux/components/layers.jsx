import React, { PropTypes } from 'react'

import READY from 'components/ready'

const layers = ( { showReady, showForm, showScreen, showMap, setVisibility } ) => {

	return(

		<div>
			{ showReady && <READY setVisibility={ setVisibility }  /> }
			{ showForm && <p>form</p> }
			{ showScreen && <p>screen</p> }
			{ showMap && <p>map</p> }
		</div>

	)

}

layers.propTypes = {

	showReady: PropTypes.bool,
	showForm: PropTypes.bool,
	showScreen: PropTypes.bool,
	showMap: PropTypes.bool,
	setVisibility: PropTypes.func

}

export default layers