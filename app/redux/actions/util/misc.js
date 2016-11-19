var scroll = 0;

export const lockWindowScroll = ( ) => {

	scroll = window.pageYOffset
	document.body.style.overflow = 'hidden'
	document.body.style.position = 'fixed'
	document.body.style.top = -scroll

	window.addEventListener( 'resize', unlockWindowScroll )

}

export const unlockWindowScroll = ( ) => {

	document.body.style.overflow = 'auto'
	document.body.style.position = 'initial'
	window.scroll( 0, scroll )

	window.removeEventListener( 'resize', unlockWindowScroll )

}