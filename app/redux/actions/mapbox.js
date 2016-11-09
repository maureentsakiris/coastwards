import * as types from 'types'
import mapboxgl from './mapbox-helper.js'
import mapboxglgeocoder from 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.js'
import _ from 'underscore'
import { promiseGet } from 'actions/util/request/get'
import { resetMain } from 'actions/main'

const CENTER = [ 0, 39 ]
const ZOOM = 1

const locateLayers = [ 'country_label_1', 'country_label_2', 'country_label_3', 'country_label_4', 'marine_label_point_1', 'marine_label_line_1', 'marine_label_point_2', 'marine_label_line_2', 'marine_label_point_3', 'marine_label_line_3', 'marine_label_4', 'marine_label_line_4', 'place_label_city', 'place_label_town', 'place_label_village', 'place_label_other', 'road_label_highway_shield', 'road_label', 'airport_label', 'poi_label_1', 'rail_station_label', 'poi_label_2', 'poi_label_3', 'poi_label_4', 'water_label'/*, 'admin_level_2_maritime', 'admin_level_3_maritime', 'admin_level_2_disputed', 'admin_level_2', 'admin_level_3'*/, 'bridge_major_rail_hatching', 'bridge_major_rail', 'bridge_motorway', 'bridge_trunk_primary', 'bridge_secondary_tertiary', 'bridge_street', 'bridge_link', 'bridge_service_track', 'bridge_motorway_link', 'bridge_path_pedestrian', 'bridge_motorway_casing', 'bridge_trunk_primary_casing', 'bridge_secondary_tertiary_casing', 'bridge_motorway_link_casing', 'road_major_rail_hatching', 'road_major_rail', 'road_motorway', 'road_trunk_primary', 'road_secondary_tertiary', 'road_street', 'road_link', 'road_service_track', 'road_motorway_link', 'road_path_pedestrian', 'road_motorway_casing', 'road_trunk_primary_casing', 'road_secondary_tertiary_casing', 'road_street_casing', 'road_link_casing', 'road_service_track_casing', 'road_motorway_link_casing', 'tunnel_major_rail_hatching', 'tunnel_major_rail', 'tunnel_motorway', 'tunnel_trunk_primary', 'tunnel_secondary_tertiary', 'tunnel_street', 'tunnel_link', 'tunnel_service_track', 'tunnel_motorway_link', 'tunnel_path_pedestrian', 'tunnel_motorway_casing', 'tunnel_trunk_primary_casing', 'tunnel_secondary_tertiary_casing', 'tunnel_street_casing', 'tunnel_link_casing', 'tunnel_service_track_casing', 'tunnel_motorway_link_casing', 'building_top', 'building', 'aeroway_taxiway', 'aeroway_runway', 'aeroway_fill', 'landuse_wood', 'landuse_school', 'landuse_hospital', 'landuse_cemetery', 'landuse_park', 'landuse_overlay_national_park' ]

const _promiseInitMap = ( ) => {

	return new Promise( ( resolve, reject ) => {

		mapboxgl.accessToken = 'pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpbXM1N2Z2MTAwNXF3ZW0ydXI3eXZyOTAifQ.ATjSaskEecYMiEG36I_viw' 
		const map = new mapboxgl.Map( {

			container: 'Mapbox',
			style: 'mapbox://styles/maureentsakiris/cinxhoec70043b4nmx0rkoc02',
			zoom: ZOOM,
			center: CENTER,
			maxBounds: [ [ -360, -70 ], [ 360, 84 ] ],
			attributionControl: false,
			boxZoom: false,
			dragRotate: false,
			dragPan: true,
			keyboard: false,
			doubleClickZoom: true,
			touchZoomRotate: true,
			failIfMajorPerformanceCaveat: true

		} )


		/*map.addControl( new mapboxgl.Scale ( {
			
			position: 'top-left',
			maxWidth: 80,
			unit: 'metric'
		
		} ) )*/

		//map.addControl( new mapboxgl.Geolocate( { position: 'bottom-left' } ) )

		map.on( 'load', ( ) => {

			map.addControl( new mapboxgl.NavigationControl( { position: 'bottom-right' } ) )
			map.dragRotate.disable()
			map.touchZoomRotate.disableRotation()
			resolve( map ) 

		} )

		map.on( 'error', ( e ) => {

			reject( e ) 

		} )


		/*map.on( 'resize', ( e ) => {

			map.touchZoomRotate.enable()
			map.touchZoomRotate.disableRotation()

		} )*/

	} )

}

const _promiseFetchGeojson = () => {

	return  promiseGet( '/contribute/geojson' )

}

const _promiseOKGeojson = ( parsed ) => {

	return new Promise( ( resolve, reject ) => {

		if( parsed.status == 'KO' ){

			reject( parsed.message )

		}else{

			resolve( parsed.json )

		}

	} )

}

const _onMarkerClick = ( features ) => {

	return function ( dispatch ){

		let feature = features[ 0 ]
		dispatch( showPopup( feature ) )

	}

}

const _onClusterClick = ( features ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const map = state.mapbox.map

		let point = features[ 0 ].geometry.coordinates
		let z = map.getZoom()

		map.flyTo( { center: point, zoom: z + 4 } )

	}

}

export const displayMap = ( ) => {

	return function ( dispatch, getState ){

		_promiseInitMap( )
		.then( ( map ) => {

			//Register map
			dispatch( { type: types.SET_MAP, to: map } )

			//Track zoom
			map.on( 'zoom', () => {

				dispatch( { type: types.SET_ZOOM, to: map.getZoom() } )

			} )

			//Track center
			map.on( 'move', () => {

				dispatch( { type: types.SET_CENTER, to: map.getCenter() } )

			} )


			//Init and register popup
			const popup = new mapboxgl.Popup( { closeButton: false, closeOnClick: false, anchor: 'bottom' } )
			const featureDOM = document.getElementById( 'Popup' )
			popup.setDOMContent( featureDOM )
			dispatch( { type: types.SET_POPUP, to: popup } )

			//Init mouse events
			map.on( 'mousemove', ( e ) => {

				const state = getState()
				const interactiveLayers = state.interactiveLayers
				
				let features = map.queryRenderedFeatures( e.point, { layers: _.pluck( interactiveLayers, 'layer' ) } )
				map.getCanvas().style.cursor = ( features.length ) ? 'pointer' : ''
			
			} )

			map.on( 'click', ( e ) => {

				const state = getState()
				const interactiveLayers = state.interactiveLayers

				let features = map.queryRenderedFeatures( e.point, { layers: _.pluck( interactiveLayers, 'layer' ) } )

				if( !features.length ){

					return

				}

				let feature = features[ 0 ]
				let interactiveLayer = _.findWhere( interactiveLayers, { layer: feature.layer.id } )
				let onClick = interactiveLayer.onClick

				dispatch( onClick( features ) )

			} )

			return map


		} )
		.then( _promiseFetchGeojson )
		.then( JSON.parse )
		.then( _promiseOKGeojson )
		.then( ( geojson ) => {

			if( _.isNull( geojson ) ){

				dispatch( { type: types.SET_PROMPT_MSG, to: 'be_the_first' } )

			}

			const state = getState()
			const map = state.mapbox.map

			map.addSource( 'geojson', {

				type: 'geojson',
				data: geojson,
				cluster: true,
				clusterMaxZoom: 10, // Max zoom to cluster points on
				clusterRadius: 20 // Radius of each cluster when clustering points (defaults to 50)
				
			} )

			map.addLayer( {
			
				id: 'markers',
				type: 'circle',
				source: 'geojson',
				filter: [ '!has', 'point_count' ],
				/*layout: {

					'icon-image': '{marker-symbol}'

				},*/
				paint: {
					// make circles larger as the user zooms from z12 to z22
					'circle-radius': {
						'base': 1.75,
						'stops': [ [ 0, 7 ], [ 10, 15 ], [ 22, 50 ] ]
					},
					// color circles by ethnicity, using data-driven styles
					'circle-color': {
						property: 'material',
						type: 'categorical',
						stops: [
							[ 'sand', '#fbb03b' ],
							[ 'pebble', '#223b53' ],
							[ 'rock', '#7e3096' ],
							[ 'mud', '#8a5707' ],
							[ 'ice', '#ef25db' ],
							[ 'notsure', '#ccc' ],
							[ 'manmade', '#000' ],
							[ '', '#396dc1' ]
						] 
					}

				}

			}, 'country_label_1' )

			map.addLayer( {
			
				id: 'cluster-circles',
				type: 'circle',
				source: 'geojson',
				paint: {
					'circle-radius': 15,
					'circle-color': '#396dc1'
				},
				filter: [ '>', 'point_count', 1 ]

			}, 'country_label_1' )

			map.addLayer( {

				id: 'cluster-count',
				type: 'symbol',
				source: 'geojson',
				layout: {

					'text-field': '{point_count}',
					'text-font': [
						'DIN Offc Pro Medium',
						'Arial Unicode MS Bold'
					],
					'text-size': 12

				},
				paint: {

					'text-color': '#ffffff'

				}

			}, 'country_label_1' )

			dispatch( { type: types.ADD_INTERACTIVE_LAYER, layer: { layer: 'markers', onClick: _onMarkerClick } } )
			dispatch( { type: types.ADD_INTERACTIVE_LAYER, layer: { layer: 'cluster-circles', onClick: _onClusterClick } } )
			dispatch( { type: types.ADD_INTERACTIVE_LAYER, layer: { layer: 'cluster-count', onClick: _onClusterClick } } )

			let data = {

				"type": "FeatureCollection",
				"features": []

			}

			map.addSource( 'drops', {

				type: 'geojson',
				data: data
				
			} )

			map.addLayer( {
			
				id: 'drops',
				type: 'symbol',
				source: 'drops',
				layout: {

					'icon-image': '{marker-symbol}'

				}

			} )

			dispatch( { type: types.ADD_INTERACTIVE_LAYER, layer: { layer: 'drops', onClick: _onMarkerClick } } )

			return geojson

		} )
		.catch( ( error ) => {

			dispatch( resetMain() )
			dispatch( { type: types.SET_ERROR_MSG, to: error.message } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'errors', to: true } )
			dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'prompts', to: false } )
			console.log( error )

		} )

	}

}

export const fly = ( center, zoom ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const map = state.mapbox.map

		map.flyTo( {

			center: center,
			zoom: zoom,
			duration: 5000,
			speed: 1.2, // make the flying slow
			curve: 1.42, // change the speed at which it zooms out
			easing: function ( t ) {

				return t<.5 ? 16*t*t*t*t*t : 1+16*( --t ) *t*t*t*t

			}

		} )

	}

}

export const dropMarker = ( image ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const map = state.mapbox.map

		const feature = {

			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [ image.long, image.lat ]
			},
			"properties": {
				"marker-symbol": "marker-accent",
				"image": image.dataURL
			}

		}

		dispatch( { type: types.ADD_DROP, drop: feature } )

		if( map ){

			let freshState = getState()
			
			let data = {

				"type": "FeatureCollection",
				"features": freshState.drops
			}

			map.getSource( 'drops' ).setData( data )

		}

	}

}

export const switchModus = ( modus ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const map = state.mapbox.map

		if( modus === 'locate' ){

			map.setLayoutProperty( 'markers', 'visibility', 'none' )
			map.setLayoutProperty( 'cluster-circles', 'visibility', 'none' )
			map.setLayoutProperty( 'cluster-count', 'visibility', 'none' )
			map.setLayoutProperty( 'drops', 'visibility', 'none' )

			_.each( locateLayers, ( layer ) => {

				map.setLayoutProperty( layer, 'visibility', 'visible' )

			} )

			map.addControl( new mapboxgl.Geocoder() )

		}else{

			map.setLayoutProperty( 'markers', 'visibility', 'visible' )
			map.setLayoutProperty( 'cluster-circles', 'visibility', 'visible' )
			map.setLayoutProperty( 'cluster-count', 'visibility', 'visible' )
			map.setLayoutProperty( 'drops', 'visibility', 'visible' )

			_.each( locateLayers, ( layer ) => {

				map.setLayoutProperty( layer, 'visibility', 'none' )

			} )

		}


	}

}

export const showPopup = ( feature ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const map = state.mapbox.map
		let popup = state.popup.popup

		if( popup && popup._container ){

			popup._container.setAttribute( 'style', '' )

		}

		dispatch( { type: types.SET_POPUP_FEATURE, to: feature } )
		popup.setLngLat( feature.geometry.coordinates ).addTo( map )

		let cz = map.getZoom();
		let z = cz < 2 ? 2 : cz;

		const featureDOM = document.getElementById( 'Popup' )
		let offsetY = featureDOM.clientHeight / 2
		map.flyTo( { speed: 0.4, center: feature.geometry.coordinates, offset: [ 0, offsetY ], zoom: z } )

	}

}

export const hidePopup = ( ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const popup = state.popup.popup

		if( popup && popup._container ){

			popup._container.setAttribute( 'style', 'display: none' )

		}

	}

}

export const resetMap = ( ) => {

	return function ( dispatch ){

		dispatch( fly( CENTER, ZOOM ) )
		dispatch( switchModus() )

	}

}
