const webpack = require( 'webpack' );
const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );


const PROJECT_ROOT = path.resolve( './' );

const BUILD_TARGET = 'development' ;
const BUILD_ROOT = path.join( PROJECT_ROOT, 'build' , BUILD_TARGET );
const ENTRY_ROOT = path.join( PROJECT_ROOT, 'app/index.jsx' );

const APP_ROOT = path.join( PROJECT_ROOT, 'app' );
const PUBLIC_ROOT = path.join( PROJECT_ROOT, 'public/assets' );
const PUBLIC_UPLOADS = path.join( PROJECT_ROOT, 'public/uploads' );
const TOOLBOX_ROOT = path.join( PROJECT_ROOT, 'node_modules/react-toolbox' );
const MAPBOX_ROOT = path.join( PROJECT_ROOT, 'node_modules/mapbox-gl' );


const extendConfig = require ( './plugins/webpackDevServer' ).extendConfig ;

const config = require ( './development.js' )
module.exports = extendConfig ( config ) ;

