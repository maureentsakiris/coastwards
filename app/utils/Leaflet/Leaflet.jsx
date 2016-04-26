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
			zoomControl: false,
			attributionControl: false

		} ).setView( [ 40.737, -73.923 ], 3 );


		L.tileLayer( 'https://api.mapbox.com/styles/v1/mapbox/emerald-v8/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA', {

			tileSize: 512,
			zoomOffset: -1,
			attribution: ''

		} ).addTo( map );

		map.fitWorld().zoomIn();

	}

}
