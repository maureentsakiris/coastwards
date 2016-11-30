/*import * as types from 'types'*/

export function scrollToId ( id ){

	/*window.scroll( {

		top: document.body.scrollHeight, 
		left: 0, 
		behavior: 'smooth' 

	} )*/

	let div = document.getElementById( id )
	div.scrollIntoView( { behavior: 'smooth' } )

}