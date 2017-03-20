export const scrollToDiv = ( div ) => {

	return function ( ){

		document.querySelector( '#' + div ).scrollIntoView( { 

			behavior: 'smooth' } 

		);

	}

}