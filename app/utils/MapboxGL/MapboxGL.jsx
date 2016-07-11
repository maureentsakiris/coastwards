import React, { Component, PropTypes } from 'react';
import Classnames from 'classnames';
import _ from 'underscore';
import underscoreDeepExtend from 'underscore-deep-extend';
_.mixin( { deepExtend: underscoreDeepExtend( _ ) } );
import mapboxgl from 'mapbox-gl';

import styleCSS from './_styleMapboxGL';

export default class MapboxGL extends Component {

	static propTypes = {

		className: PropTypes.string,
		ref: PropTypes.string,
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
		navigationControl: PropTypes.bool,
		navigationControlPosition: PropTypes.string,
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

		ref: "map",
		unsupportedTitle: "Browser upgrade",
		unsupportedMessage: "Sorry, we can't show the map because your browser does not support the necessary web technology. For this and many other reasons, we recommend you upgrade your browser.",
		language: "en",
		accessToken: "pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA",

		container: "MapboxGl",
		style: "mapbox://styles/mapbox/streets-v8",
		interactive: true,
		navigationControl: false,
		navigationControlPosition: 'top-right',

		scrollZoom: true,
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

	shouldComponentUpdate ( nextProps ){

		return false;

	}

	constructor ( props ) {

		super ( props );

		this.map;
		this.popup;

		this.state = {

		}

	}

	render () {

		const { className, ref, unsupportedTitle, unsupportedMessage, language, accessToken, container, style, center, zoom, minZoom, maxZoom, hash, interactive, bearing, attributionControl, navigationControl, navigationControlPosition, maxBounds, scrollZoom, boxZoom, dragRotate, dragPan, keyboard, doubleClickZoom, touchZoomRotate, failIfMajorPerformanceCaveat, preserveDrawingBuffer, layers, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		const cls = Classnames( styleCSS.map, className );  

		return (

			<div {...restProps} id="MapboxGl" className={ cls } ref={ ref } />

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

	_promiseCreateMap = ( ) => {

		let props = _.omit( this.props, 'className', 'language' );
		let { accessToken, unsupportedTitle, unsupportedMessage, navigationControl, layers, ...options  } = props;

		return new Promise( ( resolve, reject ) => {

			if ( !mapboxgl.supported() ) {

				this.context.showDialog( { title: unsupportedTitle, content: unsupportedMessage } );
				reject( Error( 'MapboxGl/_createMap/Mapbox is not supported' ) );

			} else {

				mapboxgl.accessToken = accessToken;
				this.map = new mapboxgl.Map( options );
				this.popup = new mapboxgl.Popup( { closeButton: false, closeOnClick: false, anchor: 'bottom' } );

				if( !( this.map instanceof mapboxgl.Map ) ){

					return reject( Error( 'MapboxGl/_createMap/Failed to create instance of mapboxGl.Map' ) );

				}

				// LOAD INITIAL LAYERS
				this.map.on( 'load', ( ) => {

					// SETTING INTERACTIONS One would think initializing with values would be enough, but ....
					let interactions = [ 'scrollZoom', 'boxZoom', 'dragRotate', 'dragPan', 'keyboard', 'doubleClickZoom', 'touchZoomRotate' ];
					_.each( interactions, ( i ) => {

						if( options.interactive ){

							let flag = options[ i ] ? 'enable' : 'disable';
							this.map[ i ][ flag ]();

						}

					} );

					// ADD NAVIGATION CONTROLS
					if( navigationControl ){

						this.map.addControl( new mapboxgl.Navigation( { position: this.props.navigationControlPosition } ) );

					}

					// ADD LAYERS
					_.each( layers, this._addLayer );

					resolve( this.map );

				} );

				this.map.on( 'error', ( e ) => {

					reject( Error( 'MapboxGl/_createMap/Error creating map/' + e ) ) 

				} );
				/*this.map.on( 'style.error', ( e ) => {

					reject( Error( 'MapboxGl/_createMap/Error loading style/' + e ) ) 

				} );
				this.map.on( 'source.error', ( e ) => {

					reject( Error( 'MapboxGl/_createMap/Error loading source/' + e ) ) 

				} );
				this.map.on( 'tile.error', ( e ) => {

					reject( Error( 'MapboxGl/_createMap/Error loading tiles/' + e ) ) 

				} );
				this.map.on( 'layer.error', ( e ) => {

					reject( Error( 'MapboxGl/_createMap/Error loading layer/' + e ) ) 

				} );*/

			}

		} );

	}

	_addLayer = ( o ) => {

		let { name, source, layer, position, onPopup } = o;
		
		/*let sourceExtended = _.deepExtend( this.sourceDefaults, source );*/
		let layerExtended = _.deepExtend( layer, { id: name, source: name } );

		this.map.addSource( name, source );
		this.map.addLayer( layerExtended, position );

		if( _.isFunction( onPopup ) ){

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

				var cz = this.map.getZoom();
				var z = cz < 1 ? 1.2 : cz;

				this.map.flyTo( { center: feature.geometry.coordinates, offset: [ 0, 100 ], zoom: z } );

				
				this.popup.setLngLat( feature.geometry.coordinates )
					.addTo( this.map );

				onPopup( this.popup, feature );

			} );

		}

	}

	_clusterLayer = ( o ) => {

		let { sourcename, position/*, onClick*/ } = o;
		let circleLayerName = sourcename + "-circle";
		let countLayerName = sourcename + "-count";

		this.map.addLayer( {
			
			"id": circleLayerName,
			"type": "circle",
			"source": sourcename,
			"paint": {
				"circle-color": '#3a6b8e',
				"circle-radius": 14
			},
			"filter": [ ">", "point_count", 1 ]

		}, position );

		this.map.addLayer( {

			"id": countLayerName,
			"type": "symbol",
			"source": sourcename,
			"layout": {

				"text-field": "{point_count}",
				"text-font": [
					"DIN Offc Pro Medium",
					"Arial Unicode MS Bold"
				],
				"text-size": 12

			},
			"paint": {

				"text-color": "#ffffff"

			}

		}, position );

		/*if( onClick ){

			this.map.on( 'mousemove', ( e ) => {
				
				var features = this.map.queryRenderedFeatures( e.point, { layers: [ circleLayerName ] } );
				this.map.getCanvas().style.cursor = ( features.length ) ? 'pointer' : '';
			
			} );

			this.map.on( 'click', ( e ) => {

				var features = this.map.queryRenderedFeatures( e.point, { layers: [ circleLayerName ] } );

				console.log( features );

				if ( !features.length ) {

					return;

				}

				var feature = features[ 0 ];

				onClick( feature );

			} );

		}*/

	}

}
