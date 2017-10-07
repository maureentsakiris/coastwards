import * as types from 'types'
import { promiseInitMapbox, mapboxPopup, mapboxLngLatConvert } from 'actions/mapbox/mapbox'
import { map } from 'underscore'
import { fetch } from 'actions/admin/admin'
import { promiseGet, promiseJSONOK } from 'actions/util/request/get'
//import { promiseGet, promiseJSONOK } from 'actions/util/request/get'

const _map = map

const ZOOM = 1
const CENTER = [ 0, 39 ]
const ACCESSTOKEN = 'pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA'

const OPTIONS = {

	container: 'Mapbox',
	style: 'mapbox://styles/mapbox/satellite-streets-v10',
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

export const displayMap = ( ) => {

	return function ( dispatch, getState ){

		promiseInitMapbox( ACCESSTOKEN, OPTIONS )
			.then( ( map ) => {

				const state = getState()

				dispatch( { type: types.SET_MAP, to: map } )

				map.dragRotate.disable()
				map.touchZoomRotate.disableRotation()

				const popup = mapboxPopup( { closeButton: false, closeOnClick: false, anchor: 'bottom' } )
				const featureDOM = document.getElementById( 'Popup' )
				popup.setDOMContent( featureDOM )
				dispatch( { type: types.SET_POPUP_INSTANCE, to: popup } )

				map.on( 'mousemove', ( e ) => {
				
					let features = map.queryRenderedFeatures( e.point, { layers: [ 'markers' ] } )
					map.getCanvas().style.cursor = ( features.length ) ? 'pointer' : ''
			
				} )

				map.on( 'click', ( e ) => {

					let features = map.queryRenderedFeatures( e.point, { layers: [ 'markers' ] } )

					if( !features.length ){

						dispatch( hidePopup() )
						return

					}

					/*let feature = features[ 0 ]
				feature.point = e.point*/

					dispatch( _onMarkerClick( features ) )

				} )

				let geojson = {

					"type": "FeatureCollection",
					"features": []

				}

				map.addSource( 'geojson', {

					type: 'geojson',
					data: geojson

				} )

				const stops = _map( state.materials, ( material ) => {

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
			.then( ( map ) => {
				
				dispatch( fetch() )
				return map

			} )
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

		dispatch( hidePopup() )

		let empty = {

			"type": "FeatureCollection",
			"features": []

		}

		const json = data === null ? empty : data

		map.getSource( 'geojson' ).setData( json )
		//map.flyTo( { speed: 1, center: CENTER, zoom: ZOOM } )

	}


}

const _onMarkerClick = ( features ) => {

	return function ( dispatch ){

		let feature = features[ 0 ]

		dispatch( { type: types.SET_POPUP_FEATURE, to: {} } )

		promiseGet( '/administrate/' + feature.properties.id )
			.then( JSON.parse )
			.then( promiseJSONOK )
			.then( ( parsed ) => {

				const json = parsed.json
				dispatch( showPopup( json ) )
				return json

			} )
			.catch( ( error ) => {

				console.log( error )

			} )

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

		map.flyTo( { speed: 1, center: wrapped, offset: [ 0, offsetY ], zoom: z } )

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