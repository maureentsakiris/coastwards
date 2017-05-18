import * as types from 'types'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import _ from 'underscore'
//import { promiseGet, promiseJSONOK } from 'actions/util/request/get'

const CENTER = [ 0, 39 ]
const ZOOM = 1
const MAXZOOM = 17

const ACCESSTOKEN = 'pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA'

const _promiseInitMap = ( ) => {

	return new Promise( ( resolve, reject ) => {

		mapboxgl.accessToken = ACCESSTOKEN 
		const map = new mapboxgl.Map( {

			container: 'Mapbox',
			style: 'mapbox://styles/mapbox/satellite-streets-v10',
			zoom: ZOOM,
			maxZoom: MAXZOOM,
			center: CENTER,
			maxBounds: [ [ -360, -70 ], [ 360, 84 ] ],
			attributionControl: false,
			boxZoom: false,
			dragRotate: false,
			dragPan: true,
			keyboard: false,
			doubleClickZoom: true,
			touchZoomRotate: true

		} )

		map.on( 'load', ( ) => {

			map.dragRotate.disable()
			map.touchZoomRotate.disableRotation()
			resolve( map )

		} )

		map.on( 'error', ( ) => {

			reject( Error( 'error_loading_mapbox' ) )  

		} )

	} )

}

export const displayMap = ( ) => {

	return function ( dispatch, getState ){

		_promiseInitMap()
		.then( ( map ) => {

			const state = getState()

			dispatch( { type: types.SET_MAP, to: map } )

			map.on( 'mousemove', ( e ) => {

				const state = getState()
				const interactiveLayers = state.interactiveLayers
				
				let features = map.queryRenderedFeatures( e.point, { layers: _.pluck( interactiveLayers, 'layer' ) } )
				map.getCanvas().style.cursor = ( features.length ) ? 'pointer' : ''
			
			} )

			let geojson = {

				"type": "FeatureCollection",
				"features": []

			}

			map.addSource( 'geojson', {

				type: 'geojson',
				data: geojson

			} )

			const stops = _.map( state.materials, ( material ) => {

				let { value, color } = material
				return [ value, color ]

			} )

			map.addLayer( {
			
				id: 'markers',
				type: 'circle',
				source: 'geojson',
				filter: [ '!has', 'point_count' ],
				paint: {
					'circle-radius': {
						'base': 1.75,
						'stops': [ [ 0, 7 ], [ 10, 15 ], [ 22, 50 ] ]
					},
					'circle-color': {
						property: 'materialverified',
						type: 'categorical',
						stops: stops
					}

				}

			} )

			return map


		} )
		/*.then( _promiseFetchGeojson )
		.then( JSON.parse )
		.then( promiseJSONOK )
		.then( ( parsed ) => {

			const geojson = parsed.json

			if( _.isNull( geojson ) ){

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

			const stops = _.map( state.materials, ( material ) => {

				let { value, color } = material
				return [ value, color ]

			} )

			map.addLayer( {
			
				id: 'markers',
				type: 'circle',
				source: 'geojson',
				filter: [ '!has', 'point_count' ],
				paint: {
					'circle-radius': {
						'base': 1.75,
						'stops': [ [ 0, 7 ], [ 10, 15 ], [ 22, 50 ] ]
					},
					'circle-color': {
						property: 'materialverified',
						type: 'categorical',
						stops: stops
					}

				}

			}, 'water_label' )

			return geojson

		} )*/
		.catch( ( error ) => {

			let msg = error.message ? error.message : 'an_error_occurred'
			dispatch( { type: types.SET_ERROR_MSG, to: msg } )

			console.log( error );

		} )

	}

}

export const setMapData = ( data ) => {

	return function ( dispatch, getState ){

		const state = getState()
		const map = state.mapbox.map

		map.getSource( 'geojson' ).setData( data )


	}


}