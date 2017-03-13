import * as types from 'types'


export const setScrollY = ( pos ) => {

	return {

		type: types.SET_SCROLL_Y,
		to: pos

	}

	/*window.scroll( {

		top: document.body.scrollHeight, 
		left: 0, 
		behavior: 'smooth' 

	} )
*/

}

export const scrollToDiv = ( div ) => {

	return function ( ){

		document.querySelector( '#' + div ).scrollIntoView( { 

			behavior: 'smooth' } 

		);

	}

}