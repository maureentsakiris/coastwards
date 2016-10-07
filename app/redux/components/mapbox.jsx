import React, { Component, PropTypes } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'

import DIV from 'components/tags/div'

export default class MapboxGL extends Component {

	static propTypes = {

		className: PropTypes.string,

		center: PropTypes.array,
		zoom: PropTypes.number

	}

	shouldComponentUpdate ( p ){

		return p.zoom !== this.props.zoom || p.center !== this.props.center

	}

	componentWillUpdate ( p ){

		this.map.flyTo( {

			center: p.center,
			zoom: p.zoom,
			duration: 5000,
			speed: 5, // make the flying slow
			curve: 1, // change the speed at which it zooms out
			easing: function ( t ) {

				return t<.5 ? 16*t*t*t*t*t : 1+16*( --t ) *t*t*t*t;

			}

		} )

	}

	componentDidMount (){

		const { center, zoom } = this.props

		mapboxgl.accessToken = 'pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpbXM1N2Z2MTAwNXF3ZW0ydXI3eXZyOTAifQ.ATjSaskEecYMiEG36I_viw'
		this.map = new mapboxgl.Map( {

			container: 'Mapbox',
			style: 'mapbox://styles/maureentsakiris/cinxhoec70043b4nmx0rkoc02',
			zoom: zoom,
			center: center,
			maxBounds: [ [ -360, -70 ], [ 360, 84 ] ],
			attributionControl: false

		} )

		this.map.addControl( new mapboxgl.Navigation( { position: 'bottom-right' } ) )


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
