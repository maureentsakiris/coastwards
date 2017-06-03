import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import coastwards from 'reducers'
import { loadLanguage } from 'actions/i18n/i18n'
import I18nProvider from 'containers/i18n/i18nProvider'
import Context from 'containers/context'


const store = createStore( coastwards, compose(

	applyMiddleware( thunk )

) )

if ( module.hot ) {

    // Enable Webpack hot module replacement for reducers
	module.hot.accept( '../reducers', () => {

		console.log( "HOT" );
		const nextRootReducer = require( '../reducers' )
		store.replaceReducer( nextRootReducer )

	} )

}

//load negotiated language
const [ navigatorLocale ] = window.navigator.language.split ( '-' )
const negotiatedLocale = document.documentElement.getAttribute( 'lang' )
store.dispatch( loadLanguage( negotiatedLocale || navigatorLocale ) )


const storeprovider = () => {

	return (

		<Provider store={ store } >
			<I18nProvider>
				<Context />
			</I18nProvider>
		</Provider>

	)

}

export default storeprovider