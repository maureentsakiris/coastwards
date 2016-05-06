import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import mapboxgl from 'mapbox-gl';

import style from './_styleMapboxGL';

export default class MapboxGL extends Component {

	static propTypes = {

		className: PropTypes.string,
		unsupportedTitle: PropTypes.string,
		unsupportedMessage: PropTypes.string,
		language: PropTypes.string

	};

	static defaultProps = {

		unsupportedTitle: "Browser upgrade",
		unsupportedMessage: "Sorry, we can't show the map because your browser does not support the necessary web technology. For this and many other reasons, we recommend you upgrade your browser.",
		language: "en"

	};

	static contextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
	}

	componentDidMount ( ) {

		this._createMap();

	}

	componentDidUpdate ( ) {

		this._createMap(); 

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );
		this.map;

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

		let { language } = this.props;

		if ( !mapboxgl.supported() ) {

			this.context.showDialog( { title: this.props.unsupportedTitle, content: this.props.unsupportedMessage } );

		} else {
 
			// mapboxgl.accessToken = 'pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA';
			mapboxgl.accessToken = 'pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA';
			this.map = new mapboxgl.Map( {
				container: 'MapboxGl',
				/*style: 'mapbox://styles/maureentsakiris/cinnokj3e005ed6m4s3mpu48t',*/
				style: 'mapbox://styles/mapbox/streets-v8',
				zoom: 0
			} );

			//this.map.setLayoutProperty( 'country-label-lg', 'text-field', '{name_' + language + '}' );

			this.map.on( 'load', function ( ) {

				this.setLayoutProperty( 'country-label-lg', 'text-field', '{name_' + language + '}' );
				this.scrollZoom.disable();
				//this.dragPan.disable();
				//this.doubleClickZoom.disable();
				this.touchZoomRotate.disable();
				this.keyboard.disable();
				this.dragRotate.disable(); 
				this.boxZoom.disable();

			} );

		}
		

	}

}
