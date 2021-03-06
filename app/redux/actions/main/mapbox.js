import * as types from 'types'
import { sendErrorMail } from 'actions/util/error/error'
import { promiseInitMapbox, mapboxPopup, mapboxLngLatConvert, mapboxNavigationControl, mapboxAttributionControl } from 'actions/mapbox/mapbox'
import { isNull, findWhere, pluck, map } from 'underscore'
import { promiseGet, promiseJSONOK } from 'actions/util/request/get'
//import { resetMain } from 'actions/main/main'
// import Modernizr from 'modernizr'


const _map = map

const CENTER = [ 0, 39 ]
const STOPS = window.screen.width > 1024 ? [ [ 0, 5.5 ], [ 5, 7 ], [ 10, 15 ], [ 22, 50 ] ] : [ [ 0, 7 ], [ 5, 10 ], [ 10, 15 ], [ 22, 50 ] ]
const ZOOM = 1
const ACCESSTOKEN = process.env.MAPBOX_API_ACCESSTOKEN
const OPTIONS = {

	container: 'Mapbox',
	style: process.env.MAPBOX_STYLE,
	zoom: ZOOM,
	maxZoom: 17,
	center: CENTER,
	maxBounds: [ [ -360, -70 ], [ 360, 84 ] ],
	attributionControl: false,
	boxZoom: false,
	dragRotate: false,
	dragPan: true,
	keyboard: false,
	doubleClickZoom: true,
	touchZoomRotate: true

}

const _promiseFetchGeojson = () => {

	return  promiseGet( '/contribute/geojson' )

}

const _promiseFetchGeojsonLive = () => {

	return  promiseGet( '/contribute/geojsonLive' )

}

/*const _promiseFetchOSM = () => {

	return  promiseGet( '/contribute/osm' )

}*/


const _onMarkerClick = ( features ) => {

	return function ( dispatch ){

		let feature = features[ 0 ]

		dispatch( { type: types.SET_POPUP_FEATURE, to: {} } )

		promiseGet( '/contribute/' + feature.properties.id )
			.then( JSON.parse )
			.then( promiseJSONOK )
			.then( ( parsed ) => {

				const json = parsed.json
				dispatch( showPopup( json ) )
				return json

			} )
			.catch( ( error ) => {

				dispatch( sendErrorMail( error ) )

			} )

	}

}

export const displayMap = ( ) => {

	return function ( dispatch, getState ){

		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'loader', to: true } )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'upload', to: false } )
		dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'prompts', to: false } )

		promiseInitMapbox( ACCESSTOKEN, OPTIONS )
			.then( ( map ) => {

				dispatch( { type: types.SET_MAP, to: map } )
				map.dragRotate.disable()
				map.touchZoomRotate.disableRotation()
				map.addControl( mapboxAttributionControl(), 'bottom-left' );
		

				//map.addControl( mapboxGeocoder( { accessToken: ACCESSTOKEN, placeholder: "sdfg" } ), 'top-left' )
				map.addControl( mapboxNavigationControl(), 'bottom-right' )

				const popup = mapboxPopup( { closeButton: false, closeOnClick: false, anchor: 'bottom', maxWidth: 'auto' } )
				const featureDOM = document.getElementById( 'Popup' )
				popup.setDOMContent( featureDOM )
				dispatch( { type: types.SET_POPUP_INSTANCE, to: popup } )

				map.on( 'mousemove', ( e ) => {

					const state = getState()
					const interactiveLayers = state.interactiveLayers
				
					let features = map.queryRenderedFeatures( e.point, { layers: pluck( interactiveLayers, 'layer' ) } )
					map.getCanvas().style.cursor = ( features.length ) ? 'pointer' : ''
			
				} )

				map.on( 'click', ( e ) => {

					const state = getState()
					const interactiveLayers = state.interactiveLayers

					let features = map.queryRenderedFeatures( e.point, { layers: pluck( interactiveLayers, 'layer' ) } )

					if( !features.length ){

						dispatch( hidePopup() )
						return

					}

					let feature = features[ 0 ]
					feature.point = e.point
					let interactiveLayer = findWhere( interactiveLayers, { layer: feature.layer.id } )
					let onClick = interactiveLayer.onClick

					dispatch( onClick( features ) )

				} )

				return map


			} )
			.then( _promiseFetchGeojson )
			.then( JSON.parse )
			.then( promiseJSONOK )
			.then( ( parsed ) => {

				const geojson = parsed.json

				if( isNull( geojson ) ){

					dispatch( { type: types.SET_PROMPT_MSG, to: 'be_the_first' } )

				}

				const state = getState()
				const map = state.mapbox.map

				map.addSource( 'geojson', {

					type: 'geojson',
					data: geojson,
					cluster: false,
					clusterMaxZoom: 10, // Max zoom to cluster points on
					clusterRadius: 20 // Radius of each cluster when clustering points (defaults to 50)
				
				} )

				const stops = _map( state.materials, ( material ) => {

					let { value, color } = material
					return [ value, color ]

				} )

				map.addLayer( {
			
					id: 'markers',
					type: 'circle',
					source: 'geojson',
					// filter: [ '!has', 'point_count' ],
					paint: {
						'circle-radius': {
							'base': 1.75,
							'stops': STOPS
						},
						'circle-color': {
							property: 'materialverified',
							type: 'categorical',
							stops: stops
						}

					}

				}, 'water_label' )


				dispatch( { type: types.ADD_INTERACTIVE_LAYER, layer: { layer: 'markers', onClick: _onMarkerClick } } )

				let dataDrops = {

					"type": "FeatureCollection",
					"features": []

				}

				map.addSource( 'drops', {

					type: 'geojson',
					data: dataDrops
				
				} )

				map.addLayer( {
			
					id: 'drops',
					type: 'symbol',
					source: 'drops',
					layout: {

						'icon-image': '{marker-symbol}'

					}

				}, 'country_label_1' )

				//UPLOADS
				let dataUploads = {

					"type": "FeatureCollection",
					"features": []

				}

				map.addSource( 'uploads', {

					type: 'geojson',
					data: dataUploads
				
				} )

				map.addLayer( {
			
					id: 'uploads',
					type: 'symbol',
					source: 'uploads',
					layout: {

						'icon-image': '{marker-symbol}'

					}

				}, 'country_label_1' )

				dispatch( { type: types.ADD_INTERACTIVE_LAYER, layer: { layer: 'uploads', onClick: _onMarkerClick } } )

				

				return geojson

			} )
			.then( _promiseFetchGeojsonLive )
			.then( JSON.parse )
			.then( promiseJSONOK )
			.then( ( parsed ) => {

				const geojsonLive = parsed.json

				if( !isNull( geojsonLive ) ){

					const state = getState()
					const map = state.mapbox.map

					// const pulsingDot = require( './../../../../public/assets/loader.gif' )

					// map.addImage( 'pulsing-dot', pulsingDot, { pixelRatio: 2 } );

					map.addSource( 'live', {

						type: 'geojson',
						data: geojsonLive
					
					} )

					map.addLayer( {
					
						id: 'live',
						type: 'symbol',
						source: 'live',
						layout: {

							'icon-image': '{marker-symbol}'

						}

					}, 'country_label_1' )

				}
				return geojsonLive
			
			} )
			.then( ( csv ) => {

				dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'prompts', to: true } )
				dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'upload', to: true } )
				dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'loader', to: false } )

				return csv

			} )
			/*.then( _promiseFetchOSM )
			.then( JSON.parse )
			.then( promiseJSONOK )
			.then( ( parsed ) => {

				const geojsonOSM = parsed.json

				console.log( "json", geojsonOSM )
				
				if( isNull( geojsonOSM ) ){

					dispatch( { type: types.SET_PROMPT_MSG, to: 'osm_empty' } )

				}

				const state = getState()
				const map = state.mapbox.map

				map.addSource( 'geojsonOSM', {

					type: 'geojson',
					data: geojsonOSM,
					cluster: false,
					clusterMaxZoom: 10, // Max zoom to cluster points on
					clusterRadius: 20 // Radius of each cluster when clustering points (defaults to 50)
				
				} )

				const stops = _map( state.materials, ( material ) => {

					let { value, color } = material
					return [ value, color ]

				} )

				console.log( stops )

				map.addLayer( {
			
					id: 'markersOSMPolygon',
					type: 'fill',
					source: 'geojsonOSM',
					"paint": {

						"fill-color": "#f00",
						"fill-opacity": 0.4

					},
					"filter": [ "==", "$type", "Polygon" ]
				}, 'water_label' )

				map.addLayer( {
					id: 'markersOSMLineString',
					type: 'line',
					source: 'geojsonOSM',
					"paint": {
						'line-width': 3,
						"line-color": "#f00"
					},
					"filter": [ "==", "$type", "LineString" ],
				} );

				map.addLayer( {
					id: 'markersOSMPoint',
					type: 'circle',
					source: 'geojsonOSM',
					paint: {
						'circle-radius': {
							'base': 1.75,
							'stops': STOPS
						},
						'circle-color': "#f00"

					},
					"filter": [ "==", "$type", "Point" ],
				} );

				return geojsonOSM

			} )	*/		
			.catch( ( error ) => {

				// const msg = typeof error === 'object' ? JSON.stringify( error ) : error
				let msg = error.message ? error.message : 'an_error_occurred'
				dispatch( { type: types.SET_ERROR_MSG, to: msg } )

				dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'errors', to: true } )
				dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'prompts', to: false } )
				dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'upload', to: false } )
				dispatch( { type: types.SET_LAYER_VISIBILITY, layer: 'loader', to: false } )

				dispatch( sendErrorMail( error ) )

			} )

	}

}

export const fly = ( center, zoom, offset = [ 0, 0 ] ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const map = state.mapbox.map

		map.flyTo( {

			center: center,
			zoom: zoom, 
			offset: offset,
			duration: 5000,
			speed: 1.2,
			curve: 1.42,
			easing: function ( t ) {

				return t<.5 ? 16*t*t*t*t*t : 1+16*( --t ) *t*t*t*t

			}

		} )

	}

}

export const addDropMarker = ( image ) => {

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

				"marker-symbol": "marker-accent-flat"

			}

		}

		dispatch( { type: types.ADD_DROP, feature: feature } )

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

export const removeLastDrop = () => {

	return function ( dispatch, getState ){

		dispatch( { type: types.REMOVE_LAST_DROP } )

		let state = getState()
		
		let data = {

			"type": "FeatureCollection",
			"features": state.drops

		}

		state.mapbox.map.getSource( 'drops' ).setData( data )

	}

}

export const addUploadMarker = ( image ) => {

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
				"marker-symbol": "marker-accent-flat",
				"id": image.id
			}

		}

		dispatch( { type: types.ADD_UPLOAD, feature: feature } )

		if( map ){

			let freshState = getState()
			
			let data = {

				"type": "FeatureCollection",
				"features": freshState.uploads
			}

			map.getSource( 'uploads' ).setData( data )

		}

	}

}

export const setMarkerVisibility = ( visibility ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const map = state.mapbox.map

		map.setLayoutProperty( 'markers', 'visibility', visibility )

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

		let ll = mapboxLngLatConvert( feature.contribution_point.x, feature.contribution_point.y )
		let wrapped = ll.wrap()

		dispatch( { type: types.SET_POPUP_FEATURE, to: feature } )
		popup.setLngLat( wrapped ).addTo( map )

		let cz = map.getZoom();
		let z = cz < 2.5 ? 2.5 : cz;


		const featureDOM = document.getElementById( 'Popup' )
		let offsetY = featureDOM.clientHeight / 2

		map.flyTo( { speed: 0.4, center: wrapped, offset: [ 0, offsetY ], zoom: z } ) 

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
		dispatch( setMarkerVisibility( 'visible' ) )

	}

}


export const trackZoom = ( flag ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const map = state.mapbox.map

		dispatch( { type: types.SET_ZOOM, to: map.getZoom() } )

		const track = ( ) => {

			dispatch( { type: types.SET_ZOOM, to: map.getZoom() } )

		}

		if ( flag == 'on' ){

			map.on( 'zoom', track )

		}else{

			map.off( 'zoom', track ) //MATTHIAS

		}

	}

}
