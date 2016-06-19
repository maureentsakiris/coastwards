const webpack = require( 'webpack' );
const path = require( 'path' );

var HtmlWebpackPlugin 	= require('html-webpack-plugin');

const PROJECT_ROOT = path.resolve( './' );
const BUILD_ROOT = path.join( PROJECT_ROOT, 'public/build' );


module.exports = function ( environment ) {
	environment = environment || 'production' ;

	return new HtmlWebpackPlugin ( {
		title: 'COASTWARDS',
		filename: 'index.html',
		template: path.join ( PROJECT_ROOT , 'webpack/template/index.' + environment + '.html' ),
		files: {
			/*css: [
				'./styles.css'
			]*/
		}
	} ) ;
}