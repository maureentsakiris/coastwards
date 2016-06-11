//https://gist.github.com/ghinda/8442a57f22099bdb2e34

/*var fromObj = function ( obj, form, namespace ) {
	
	var fd = form || new FormData();
	var formKey;
  
	for( var property in obj ) {

		if( obj.hasOwnProperty( property ) ) {
	
			if( namespace ) {

				formKey = namespace + '[' + property + ']';
			
			} else {

				formKey = property;

			}

			// if the property is an object, but not a File,
			// use recursivity.
			if( typeof obj[ property ] === 'object' && !( obj[ property ] instanceof File ) ) {
			
				//fromObj( obj[ property ], fd, property );
				fd.append( formKey, JSON.stringify( obj[ property ] ) );
			
			} else {
		
				// if it's a string or a File object
				console.log( formKey + ': ' + obj[ property ] );
				fd.append( formKey, obj[ property ] );
				
			}

		}

	}
  
	return fd;
	
};*/

var fromObj = function ( data ){ 

	var result = {};
	var form = new FormData();

	function recurse ( cur, prop ) {
		
		if( cur instanceof File ){

			form.append( prop, cur );

		}else if ( Object( cur ) !== cur ) {

			//result[ prop ] = cur;
			form.append( prop, cur );
		
		} else if ( Array.isArray( cur ) ) {

			for( var i=0, l=cur.length; i<l; i++ )

				recurse( cur[ i ], prop + "[" + i + "]" );
				
			if ( l == 0 ){

				result[ prop ] = []; 

			}

		} else {

			var isEmpty = true;
			for ( var p in cur ) {

				isEmpty = false;
				recurse( cur[ p ], prop ? prop+"."+p : p );

			}
			if ( isEmpty && prop ) {

				result[ prop ] = {};

			}

		}

	}
		
	recurse( data, "" );
	return form;

}

module.exports = {

	fromObj: fromObj

}