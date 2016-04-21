import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import L from './leaflet';

export default class Leaflet extends Component {

	static propTypes = {



	};

	static defaultProps = {



	};

	static contextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
	};

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

		return (

			<div id="Map"></div>

		)

	}

	_createMap ( ){

		const mymap = L.map( 'Map', {

			scrollWheelZoom: false,
			zoomControl: true

		} ).setView( [ 38.97416, -95.23252 ], 4 );


		L.tileLayer( 'https://api.mapbox.com/styles/v1/mapbox/emerald-v8/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA', {

			tileSize: 512,
			zoomOffset: -1,
			attribution: ''

		} ).addTo( mymap );

	}

}
