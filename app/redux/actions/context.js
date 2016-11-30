/*import * as types from 'types'*/

export function scrollToId ( id, e ){

	e.preventDefault()
	let div = document.getElementById( id )
	div.scrollIntoView( { behavior: 'smooth' } )

}