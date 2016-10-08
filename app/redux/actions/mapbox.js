import * as types from 'types'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import _ from 'underscore'
import { promiseGet } from 'actions/util/request/get'
import { resetMain } from 'actions/main'

const CENTER = [ 0, 39 ]
const ZOOM = 0

const _promiseInitMap = ( ) => {

	return new Promise( ( resolve, reject ) => {

		mapboxgl.accessToken = 'pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpbXM1N2Z2MTAwNXF3ZW0ydXI3eXZyOTAifQ.ATjSaskEecYMiEG36I_viw' 
		const map = new mapboxgl.Map( {

			container: 'Mapbox',
			style: 'mapbox://styles/maureentsakiris/cinxhoec70043b4nmx0rkoc02',
			zoom: ZOOM,
			center: CENTER,
			maxBounds: [ [ -360, -70 ], [ 360, 84 ] ],
			attributionControl: false

		} )

		map.addControl( new mapboxgl.Navigation( { position: 'bottom-right' } ) )

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

			resolve( parsed )

		}

	} )

}

const _promiseNotEmptyGeojson = ( parsed ) => {

	return new Promise( ( resolve, reject ) => {

		let geojson = parsed.json

		if( _.isEmpty( geojson ) ){

			reject( Error( 'be_the_first' ) )

		}else{

			resolve( geojson )

		}

	} )

}

const _onMarkerClick = ( features ) => {

	return function ( dispatch, getState ){

		console.log( "showing popup", features )

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

			dispatch( { type: types.SET_MAP, to: map } )

			map.on( 'mousemove', ( e ) => {

				const state = getState()
				const clickLayers = state.clickLayers
				
				let features = map.queryRenderedFeatures( e.point, { layers: _.pluck( clickLayers, 'layer' ) } )
				map.getCanvas().style.cursor = ( features.length ) ? 'pointer' : ''
			
			} )

			map.on( 'click', ( e ) => {

				const state = getState()
				const clickLayers = state.clickLayers

				let features = map.queryRenderedFeatures( e.point, { layers: _.pluck( clickLayers, 'layer' ) } )

				if( !features.length ){

					return

				}

				let feature = features[ 0 ]
				let layer = _.findWhere( clickLayers, { layer: feature.layer.id } )
				let onClick = layer.onClick

				dispatch( onClick( features ) )

			} )

			return map


		} )
		.then( _promiseFetchGeojson )
		.then( JSON.parse )
		.then( _promiseOKGeojson )
		.then( _promiseNotEmptyGeojson )
		.then( ( geojson ) => {

			const state = getState()
			const map = state.mapbox

			map.addSource( 'geojson', {

				type: 'geojson',
				data: geojson,
				cluster: true,
				clusterMaxZoom: 14, // Max zoom to cluster points on
				clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
				
			} )

			map.addLayer( {
			
				id: 'markers',
				type: 'symbol',
				source: 'geojson',
				filter: [ '!has', 'point_count' ],
				layout: {

					'icon-image': '{marker-symbol}'

				}

			}, 'country_label_1' )

			map.addLayer( {
			
				id: 'cluster-circles',
				type: 'circle',
				source: 'geojson',
				paint: {
					'circle-color': '#3a6b8e',
					'circle-radius': 14
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

			dispatch( { type: types.ADD_CLICK_LAYER, layer: { layer: 'markers', onClick: _onMarkerClick } } )
			dispatch( { type: types.ADD_CLICK_LAYER, layer: { layer: 'cluster-circles', onClick: _onClusterClick } } )
			dispatch( { type: types.ADD_CLICK_LAYER, layer: { layer: 'cluster-count', onClick: _onClusterClick } } )

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
			duration: 5000,
			speed: 5, // make the flying slow
			curve: 1, // change the speed at which it zooms out
			easing: function ( t ) {

				return t<.5 ? 16*t*t*t*t*t : 1+16*( --t ) *t*t*t*t;

			}

		} )


	}

}

export const resetMap = ( ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const map = state.mapbox

		dispatch( flyTo( CENTER, ZOOM ) )


	}

}

