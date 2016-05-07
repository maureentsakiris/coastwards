import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import _ from 'underscore';
import mapboxgl from 'mapbox-gl';

import style from './_styleMapboxGL';

export default class MapboxGL extends Component {

	static propTypes = {

		className: PropTypes.string,
		unsupportedTitle: PropTypes.string,
		unsupportedMessage: PropTypes.string,
		language: PropTypes.string,
		accessToken: PropTypes.string,

		container: PropTypes.string,
		style: PropTypes.oneOfType( [

			PropTypes.string,
			PropTypes.shape( {

				version: PropTypes.number,
				name: PropTypes.string,
				metadata: PropTypes.object,
				center: PropTypes.array,
				zoom: PropTypes.number,
				bearing: PropTypes.number,
				pitch: PropTypes.number,
				sprite: PropTypes.string,
				glyphs: PropTypes.string,
				transition: PropTypes.shape( {

					duration: PropTypes.number,
					delay: PropTypes.number

				} ),
				sources: PropTypes.object,
				layers: PropTypes.array

			} )
		] ),
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
		preserveDrawingBuffer: PropTypes.bool

	};

	static defaultProps = {

		unsupportedTitle: "Browser upgrade",
		unsupportedMessage: "Sorry, we can't show the map because your browser does not support the necessary web technology. For this and many other reasons, we recommend you upgrade your browser.",
		language: "en",
		accessToken: "pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA",

		container: "MapboxGl",
		style: "mapbox://styles/mapbox/streets-v8",
		interactive: true,

		scrollZoom: true,
		boxZoom: true,
		dragRotate: true,
		dragPan: true,
		keyboard: true,
		doubleClickZoom: true,
		touchZoomRotate: true

	};

	static contextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
	}

	componentDidMount ( ) {

		this._createMap();

	}

	componentWillReceiveProps ( p ) {

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
		const cls = Classnames( style.map, className );  

		return (

			<div id="MapboxGl" className={ cls } />

		)

	}

	_changeLanguage = ( language ) => {

		this.map.setLayoutProperty( 'country_label_1', 'text-field', '{name_' + language + '}' );
		this.map.setLayoutProperty( 'country_label_2', 'text-field', '{name_' + language + '}' );
		this.map.setLayoutProperty( 'country_label_3', 'text-field', '{name_' + language + '}' );
		this.map.setLayoutProperty( 'country_label_4', 'text-field', '{name_' + language + '}' );
		this.map.setLayoutProperty( 'place_label_city', 'text-field', '{name_' + language + '}' );
		this.map.setLayoutProperty( 'place_label_town', 'text-field', '{name_' + language + '}' );

	}

	_createMap = ( ) => {

		let props = _.omit( this.props, 'className', 'language' );
		let { accessToken, unsupportedTitle, unsupportedMessage, ...options  } = props;

		if ( !mapboxgl.supported() ) {

			this.context.showDialog( { title: unsupportedTitle, content: unsupportedMessage } );

		} else {

			mapboxgl.accessToken = accessToken;
			this.map = new mapboxgl.Map( options );

			// SETTING INTERACTIONS One would think initializing with values would be enough, but ....
			let interactions = [ 'scrollZoom', 'boxZoom', 'dragRotate', 'dragPan', 'keyboard', 'doubleClickZoom', 'touchZoomRotate' ];
			_.each( interactions, ( i ) => {

				if( options.interactive ){

					let flag = options[ i ] ? 'enable' : 'disable';
					this.map[ i ][ flag ]();

				}

			} );


		}

	}

}
