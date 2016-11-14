import * as types from 'types'

let scroll = 0;
export function showDialog ( component ){


	scroll = window.pageYOffset
	document.body.style.overflow = 'hidden'
	document.body.style.position = 'fixed'
	

	return {

		type: types.SHOW_DIALOG,
		component: component

	}

}

export function hideDialog ( ){

	document.body.style.overflow = 'auto'
	document.body.style.position = 'initial'
	window.scroll( 0, scroll )

	return {

		type: types.HIDE_DIALOG

	}

}