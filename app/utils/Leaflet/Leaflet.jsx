import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import L from './_leaflet';

import style from './_styleLeaflet';  

export default class Leaflet extends Component {

	static propTypes = {



	};

	static defaultProps = {



	};

	static contextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
	}

	componentDidMount (){

		this._createMap();

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		const cls = Classnames( style.map );

		return (

			<div id="Map" className={ cls }></div>

		)

	}

	_createMap ( ){


		const map = L.map( 'Map', {

			scrollWheelZoom: false,
			worldCopyJump: true,
			zoomControl: true,
			attributionControl: false

		} );

		/*//api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}*/

		//L.tileLayer.provider( 'MapBox', { id: 'cims71jzw001e9wnjcr6uxd63', accessToken: 'pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA' } ).addTo( map );

		/*https://api.mapbox.com/styles/v1/maureentsakiris/cims71jzw001e9wnjcr6uxd63.html?title=true&access_token=pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA#1.595864971897807/39.63699588910609/-22.295571680991515/0*/


		/*L.tileLayer( 'https://api.mapbox.com/styles/v1/mapbox/emerald-v8/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA', {

			tileSize: 512,
			zoomOffset: -1,
			attribution: ''

		} ).addTo( map );*/

		L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		} ).addTo( map );

		/*L.tileLayer( 'https://api.mapbox.com/styles/v1/maureentsakiris/cims71jzw001e9wnjcr6uxd63.html?title=true&access_token=pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA#1.595864971897807/39.63699588910609/-22.295571680991515/0', {
			maxZoom: 18,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		} ).addTo( map );*/

		map.fitWorld().zoomIn().zoomIn();

	}

}
