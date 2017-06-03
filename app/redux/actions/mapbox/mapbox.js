import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'


export const promiseInitMapbox = ( accesstoken, options ) => {

	return new Promise( ( resolve, reject ) => {

		mapboxgl.accessToken = accesstoken
		const map = new mapboxgl.Map( options )

		map.on( 'load', ( ) => {

			resolve( map )

		} )

		map.on( 'error', ( ) => {

			reject( Error( 'error_loading_mapbox' ) )  

		} )

	} )

}

export const mapboxNavigationControl = () => {

	return new mapboxgl.NavigationControl()

}

export const mapboxPopup = ( options ) => {

	return new mapboxgl.Popup( options )

}

export const mapboxLngLatConvert = ( x, y ) => {

	return new mapboxgl.LngLat.convert( [ x, y ] )

}

export const mapboxGeocoder = ( options ) => {

	return new MapboxGeocoder( options )

}