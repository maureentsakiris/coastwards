import * as types from 'types'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import _ from 'underscore'
import { promiseGet } from 'actions/util/request/get'
import { resetMain } from 'actions/main'

const CENTER = [ 0, 39 ]
const ZOOM = 1

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
			doubleClickZoom: false,
			touchZoomRotate: false

		} )

		map.addControl( new mapboxgl.Navigation( { position: 'bottom-right' } ) )

		/*map.addControl( new mapboxgl.Scale ( {
			
			position: 'top-left',
			maxWidth: 80,
			unit: 'metric'
		
		} ) )*/

		//map.addControl( new mapboxgl.Geolocate( { position: 'bottom-left' } ) )

		map.on( 'load', ( ) => {

			resolve( map ) 

		} )

		map.on( 'error', ( e ) => {

			reject( e ) 

		} )

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
		const map = state.mapbox

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
			const map = state.mapbox

			map.addSource( 'geojson', {

				type: 'geojson',
				data: geojson,
				cluster: true,
				clusterMaxZoom: 15, // Max zoom to cluster points on
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
						'stops': [ [ 0, 4 ], [ 10, 15 ], [ 22, 50 ] ]
					},
					// color circles by ethnicity, using data-driven styles
					'circle-color': {
						property: 'material',
						type: 'categorical',
						stops: [
							[ 'sand', '#fbb03b' ],
							[ 'pebble', '#223b53' ],
							[ 'rock', '#e55e5e' ],
							[ 'mud', '#3bb2d0' ],
							[ 'notsure', '#3bb2d0' ],
							[ 'manmade', '#ccc' ] 
						] 
					}

				}

			}, 'country_label_1' )

			map.addLayer( {
			
				id: 'cluster-circles',
				type: 'circle',
				source: 'geojson',
				paint: {
					'circle-radius': {
						'base': 1.75,
						'stops': [ [ 0, 12 ], [ 18, 100 ] ]
					},
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
					'text-size': 10

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

					'icon-image': '{marker-symbol}',
					'icon-allow-overlap': true,
					'symbol-avoid-edges': true,
					'icon-ignore-placement': true

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

export const flyTo = ( center, zoom ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const map = state.mapbox

		map.flyTo( {

			center: center,
			zoom: zoom,
			//duration: 5000,
			speed: 1.2, // make the flying slow
			curve: 1.42, // change the speed at which it zooms out
			easing: function ( t ) {

				return t<.5 ? 16*t*t*t*t*t : 1+16*( --t ) *t*t*t*t

			}

		} )

	}

}

export const showPopup = ( feature ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const map = state.mapbox
		let popup = state.popup.popup

		if( popup._container ){

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

		if( popup._container ){

			popup._container.setAttribute( 'style', 'display: none' )

		}

	}

}

export const resetMap = ( ) => {

	return function ( dispatch, getState ){

		dispatch( flyTo( CENTER, ZOOM ) )

	}

}
