const webpack = require( 'webpack' )
const path = require( 'path' )

const globalConfigs = require ( './config/' )
const server = globalConfigs.server

const PROJECT_ROOT = path.resolve( './' )
const APP_ROOT = path.join( PROJECT_ROOT, 'app' )
const BUILD_ROOT = path.join( PROJECT_ROOT, 'public/build' )
const ENTRY_INDEX = path.join( PROJECT_ROOT, 'app/entries/index.jsx' )
const ENTRY_LOGIN = path.join( PROJECT_ROOT, 'app/entries/login.jsx' )
const ENTRY_ADMIN = path.join( PROJECT_ROOT, 'app/entries/admin.jsx' )

const ASSETS = path.join( PROJECT_ROOT, 'app/assets/' )
const I18N = path.join( PROJECT_ROOT, 'app/i18n/' )
const REDUX = path.join( PROJECT_ROOT, 'app/redux/' )
const STYLES = path.join( PROJECT_ROOT, 'app/styles/' )

const autoprefixer = require( 'autoprefixer' )
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )
const extractStyles = new ExtractTextPlugin( '[name].css' )

const config = {

	server: server,
	devtool: 'eval',
	entry: { 

		index: [
			'webpack-dev-server/client?http://' + server.ip + ':' + server.port,
			'webpack/hot/only-dev-server',
			ENTRY_INDEX
		],
		login: ENTRY_LOGIN,
		admin: ENTRY_ADMIN

	},
	resolve: {
		modules: [ REDUX, I18N, ASSETS, STYLES ],
		alias: {
			modernizr$:  path.join( PROJECT_ROOT, '.modernizrrc' )
		},
		extensions: [ '.js', '.jsx', '.scss' ]
	},
	output: {
		filename: '[name].bundle.js',
		path: BUILD_ROOT,
		publicPath: '/build/',
		chunkFilename: '[name].js'
	},
	module: {
		rules: [ 
			{
				test: /\.jsx?$/,
				include: APP_ROOT,
				use: [ 

					{ loader: 'babel-loader', options: { cacheDirectory: true } },
					{ loader: 'eslint-loader' }

				]
			},
			{
				test: /\.modernizrrc$/,
				loader: 'modernizr'
			},
			{ 
				test: /\.(jpe?g|png|gif|svg)$/i,
				include: ASSETS,
				//loader: 'url?limit=10000!img?progressive=true' 
				use: [ 

					{ loader: 'url-loader', options: { limit: 10000 } },
					{ loader: 'img-loader', options: { progressive: true } }
					
				]

			},
			{
				test: /\.scss$/,
				include: APP_ROOT,
				//loader: extractStyles.extract( 'style', 'css?modules&importLoaders=1&localIdentName=[name]_[local]!postcss!sass' )
				use: extractStyles.extract( {

					fallback: 'style-loader',
					use: [

						{ loader: 'css-loader' },
						{ loader: 'postcss-loader' },
						{ loader: 'sass-loader' }

					]

				} )

			}
		]
	},
	postcss: [ autoprefixer ],
	plugins: [
		extractStyles,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
	
}

module.exports = config  