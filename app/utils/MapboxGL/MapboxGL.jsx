import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import mapboxgl from 'mapbox-gl';

import style from './_styleMapboxGL';

export default class MapboxGL extends Component {

	static propTypes = {

		className: PropTypes.string

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

		const { className } = this.props;
		const cls = Classnames( className, style.map );  

		return (

			<div id="MapboxGl" className={ cls } />

		)

	}

	_createMap = ( ) => {
 
		mapboxgl.accessToken = 'pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA';
		var map = new mapboxgl.Map( {
			container: 'MapboxGl',
			style: 'mapbox://styles/maureentsakiris/cinnokj3e005ed6m4s3mpu48t'
		} );
		// map.addControl( new mapboxgl.Navigation() );
		map.addControl( new mapboxgl.Navigation( { position: 'top-left' } ) );
		// disable map rotation using right click + drag
		map.dragRotate.disable(); 
		// disable map rotation using touch rotation gesture
		map.touchZoomRotate.disableRotation();
		// map.addControl( new mapboxgl.Geocoder() );
		// map.dragPan.disable();
		map.scrollZoom.disable();
		

	}

}
