var guid = function (){

	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function ( c ) {

		var r = Math.random()*16|0, v = c == 'x' ? r : ( r&0x3|0x8 );
		return v.toString( 16 );

	} );

}

var ueid = function (){

	// https://github.com/google/closure-library/blob/555e0138c83ed54d25a3e1cd82a7e789e88335a7/closure/goog/string/string.js#L1177

	/**
	 * Returns a string with at least 64-bits of randomness.
	 *
	 * Doesn't trust Javascript's random function entirely. Uses a combination of
	 * random and current timestamp, and then encodes the string in base-36 to
	 * make it shorter.
	 *
	 * @return {string} A random string, e.g. sn1s7vb4gcic.
	 */

	var x = 2147483648;
	return Math.floor( Math.random() * x ).toString( 36 ) + Math.abs( Math.floor( Math.random() * x ) ^ Date.now() ).toString( 36 );

}


module.exports = {

	guid: guid,
	ueid: ueid

}