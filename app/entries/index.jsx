import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import 'babel-polyfill'

require( 'smoothscroll-polyfill' ).polyfill()

import coastwards from 'reducers'
import { loadLanguage } from 'actions/i18n/i18n'
import { setScrollY } from 'actions/ui/scroll'

import I18nProvider from 'containers/i18n/i18nProvider'
import Context from 'containers/context'


const store = createStore( coastwards, compose(

	applyMiddleware( thunk )/*,
	window.devToolsExtension ? window.devToolsExtension() : ( f ) => f*/

) )

//https://github.com/reactjs/react-redux/releases/tag/v2.0.0

/*console.log( module.hot )

if ( module.hot ) {

	// Enable Webpack hot module replacement for reducers
	module.hot.accept( 'reducers', () => {

		const nextRootReducer = require( 'reducers' )
		store.replaceReducer( nextRootReducer )

	} )

}*/


//load negotiated language
const [ navigatorLocale ] = window.navigator.language.split ( '-' )
const negotiatedLocale = document.documentElement.getAttribute( 'lang' )
store.dispatch( loadLanguage( negotiatedLocale || navigatorLocale ) )

window.addEventListener( 'scroll', ( ) => {

	store.dispatch( setScrollY( window.scrollY ) )

} )


ReactDom.render( 

	<Provider store={ store } >
		<I18nProvider>
			<Context />
		</I18nProvider>
	</Provider>, 
	document.getElementById( 'Body' ) 

); 
