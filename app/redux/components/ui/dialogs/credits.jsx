import React from 'react'
import { PropTypes } from 'prop-types'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import A from 'components/tags/a'
import BR from 'components/tags/br'

import style from './_credits'


const credits = ( { className } ) => {

	const clsCredits = Classnames( className, style.underline )

	return(

		<DIV className={ clsCredits } >
			<H priority={ 2 }>Credits Basemap</H>
			<A href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</A> <BR />
			<A href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</A> - <A className="mapbox-improve-map" href="https://www.mapbox.com/feedback/?owner=maureentsakiris&amp;id=cj04f0nru00ai2rmv7kb1b0s2&amp;access_token=pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA" target="_blank">Improve this map!</A> <BR />
			<A href="https://www.digitalglobe.com/" target="_blank">© DigitalGlobe</A>
		</DIV>

	)

}

credits.propTypes = {

	className: PropTypes.string

}

export default credits