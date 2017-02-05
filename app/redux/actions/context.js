/*import * as types from 'types'*/

export function scrollToId ( id ){

	return function (){

		let div = document.getElementById( id )
		div.scrollIntoView( { behavior: 'smooth' } )

	}

}