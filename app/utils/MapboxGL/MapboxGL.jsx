import React, { Component, PropTypes } from 'react';
import Classnames from 'classnames';
import _ from 'underscore';
import underscoreDeepExtend from 'underscore-deep-extend';
_.mixin( { deepExtend: underscoreDeepExtend( _ ) } );
import mapboxgl from 'mapbox-gl';

import style from './_styleMapboxGL';

export default class MapboxGL extends Component {

	static propTypes = {

		returnMap: PropTypes.func,
		className: PropTypes.string,
		unsupportedTitle: PropTypes.string,
		unsupportedMessage: PropTypes.string,
		language: PropTypes.string,
		accessToken: PropTypes.string,

		container: PropTypes.string,
		style: PropTypes.string,
		center: PropTypes.array,
		zoom: PropTypes.number,
		minZoom: PropTypes.number,
		maxZoom: PropTypes.number,
		hash: PropTypes.bool,
		interactive: PropTypes.bool,
		bearing: PropTypes.number,
		attributionControl: PropTypes.bool,
		maxBounds: PropTypes.array,

		scrollZoom: PropTypes.bool,
		boxZoom: PropTypes.bool,
		dragRotate: PropTypes.bool,
		dragPan: PropTypes.bool,
		keyboard: PropTypes.bool,
		doubleClickZoom: PropTypes.bool,
		touchZoomRotate: PropTypes.bool,

		failIfMajorPerformanceCaveat: PropTypes.bool,
		preserveDrawingBuffer: PropTypes.bool,

		layers: PropTypes.array

	};

	static defaultProps = {

		unsupportedTitle: "Browser upgrade",
		unsupportedMessage: "Sorry, we can't show the map because your browser does not support the necessary web technology. For this and many other reasons, we recommend you upgrade your browser.",
		language: "en",
		accessToken: "pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA",

		container: "MapboxGl",
		style: "mapbox://styles/mapbox/streets-v8",
		interactive: true,

		scrollZoom: false,
		boxZoom: false,
		dragRotate: false,
		dragPan: true,
		keyboard: false,
		doubleClickZoom: true,
		touchZoomRotate: true,

		layers: []

	};

	static contextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
	}

	componentDidMount ( ) {

		this._createMap();

	}

	/*componentWillReceiveProps ( p ) {

		if( this.map.loaded() ){

			if( p.language != this.props.language ){

				this._changeLanguage( p.language );

			}

		}else{

			this.map.on( 'load', function ( ){

				if( p.language != this.props.language ){

					this._changeLanguage( p.language );

				}

			} );

		}

	}*/

	shouldComponentUpdate ( ){

		return false;

	}

/*	componentWillReceiveProps ( nextProps ) {

		let propsToCheck = [ 'zoom', 'layers' ];

		_.each( propsToCheck, ( prop ) => {

			if( !_.isEqual( nextProps[ prop ], this.props[ prop ] ) ){

				this[ '_' + prop ]( nextProps[ prop ] );

			}

		} )

	}*/

	constructor ( props ) {

		super ( props );

		this.map;

		this.sourceDefaults = {

			type: 'geojson'

		}

		this.layerDefaults = {

			type: 'symbol',
			layout: {

				'icon-image': "marker-15"

			}

		}

		this.state = {

		}

	}

	render () {

		console.log( "MAP IS RENDERING" );

		const { className } = this.props;
		const cls = Classnames( style.map, className );  

		return (

			<div id="MapboxGl" className={ cls } />

		)

	}

	/*_changeLanguage = ( language ) => {

		this.map.setLayoutProperty( 'country_label_1', 'text-field', '{name_' + language + '}' );
		this.map.setLayoutProperty( 'country_label_2', 'text-field', '{name_' + language + '}' );
		this.map.setLayoutProperty( 'country_label_3', 'text-field', '{name_' + language + '}' );
		this.map.setLayoutProperty( 'country_label_4', 'text-field', '{name_' + language + '}' );
		this.map.setLayoutProperty( 'place_label_city', 'text-field', '{name_' + language + '}' );
		this.map.setLayoutProperty( 'place_label_town', 'text-field', '{name_' + language + '}' );

	}*/

	_createMap = ( ) => {

		let props = _.omit( this.props, 'className', 'language' );
		let { accessToken, unsupportedTitle, unsupportedMessage, returnMap, layers, ...options  } = props;

		if ( !mapboxgl.supported() ) {

			this.context.showDialog( { title: unsupportedTitle, content: unsupportedMessage } );

		} else {

			mapboxgl.accessToken = accessToken;
			this.map = new mapboxgl.Map( options );
			returnMap( this.map );

			// SETTING INTERACTIONS One would think initializing with values would be enough, but ....
			let interactions = [ 'scrollZoom', 'boxZoom', 'dragRotate', 'dragPan', 'keyboard', 'doubleClickZoom', 'touchZoomRotate' ];
			_.each( interactions, ( i ) => {

				if( options.interactive ){

					let flag = options[ i ] ? 'enable' : 'disable';
					this.map[ i ][ flag ]();

				}

			} );

			// LOAD INITIAL LAYERS
			this.map.on( 'load', ( ) => {

				_.each( layers, this._addLayer )

			} );

		}

	}

	_addLayer = ( o ) => {

		let { name, source, layer, position, onClick } = o;
		
		let sourceExtended = _.deepExtend( this.sourceDefaults, source );
		let layerExtended = _.deepExtend( this.layerDefaults, layer, { id: name, source: name } );

		this.map.addSource( name, sourceExtended );
		this.map.addLayer( layerExtended, position );

		if( onClick ){

			this.map.on( 'mousemove', ( e ) => {
				
				var features = this.map.queryRenderedFeatures( e.point, { layers: [ name ] } );
				this.map.getCanvas().style.cursor = ( features.length ) ? 'pointer' : '';
			
			} );

			this.map.on( 'click', ( e ) => {

				var features = this.map.queryRenderedFeatures( e.point, { layers: [ name ] } );

				if ( !features.length ) {

					return;

				}

				var feature = features[ 0 ];

				onClick( feature );

				/*new mapboxgl.Popup()
					.setLngLat( feature.geometry.coordinates )
					.setHTML( feature.properties.comment )
					.addTo( this.map );*/

			} );

		}

	}


}
