import React, { Component, PropTypes } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

import DIV from 'components/tags/div'

export default class MapboxGL extends Component {

	static propTypes = {

		className: PropTypes.string

	}

	componentDidMount (){

		mapboxgl.accessToken = 'pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpbXM1N2Z2MTAwNXF3ZW0ydXI3eXZyOTAifQ.ATjSaskEecYMiEG36I_viw'
		this.map = new mapboxgl.Map( {

			container: 'Mapbox',
			style: 'mapbox://styles/maureentsakiris/citvwihss00692iolgu0kwkzn',
			zoom: 0,
			//maxBounds: [ [ 360, -70 ], [ -360, 84 ] ],
			center: [ 0, 39 ],
			attributionControl: false

		} )

	}

	constructor ( props ) {

		super ( props )
		this.map

	}

	render () {

		const { className } = this.props

		return(

			<DIV id="Mapbox" className={ className } ></DIV>

		)


	}

}
