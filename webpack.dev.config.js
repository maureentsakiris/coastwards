//https://stackoverflow.com/questions/42286331/how-to-get-react-hot-loader-working-with-webpack-2-and-webpackdevmiddleware

//const webpack = require( 'webpack' )
//const ExtractTextPlugin = require( 'extract-text-webpack-plugin' )
const { resolve } = require( 'path' )


//const BUILD_ROOT = resolve( __dirname, 'public/build' )

const NODEMODULES = resolve( __dirname, 'node_modules/' )
//const APP = resolve( __dirname, 'app/' )
const ASSETS = resolve( __dirname, 'app/assets/' )
const I18N = resolve( __dirname, 'app/i18n/' )
const REDUX = resolve( __dirname, 'app/redux/' )
const STYLES = resolve( __dirname, 'app/styles/' )

const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );

module.exports = {

	"mode": "development",
	"entry": {

		index: './app/entries/index.jsx',
		login: './app/entries/login.jsx',
		admin: './app/entries/admin.jsx',
		data: './app/entries/data.jsx'

	},

	"output": {

		"path": __dirname+'/static',
		"filename": "[name].[chunkhash:8].js"

	},
	resolve: {

		modules: [ NODEMODULES, REDUX, I18N, ASSETS, STYLES ],
		alias: {
			modernizr$:  resolve( __dirname, '.modernizrrc' )
		},
		extensions: [ '.js', '.jsx', '.scss' ]

	},
	"module": {
		"rules": [
			{
				"test": /\.(js|jsx)$/,
				"exclude": /node_modules/,
				"use": {
					"loader": "babel-loader",
					"options": {
						"presets": [
							"@babel/env",
							"@babel/react"
						]
					}
				}
			},
			{
				"test": /\.scss$/,
				"use": [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			},
			{

				test: /\.modernizrrc$/,
				use: [ 

					{ loader: 'modernizr-loader' },
					{ loader: 'json-loader' } 

				]

			},
		]
	},

	"plugins": [

		new MiniCssExtractPlugin( { filename: "[name]-[contenthash:8].css" } )

	]

}