import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import coastwards from 'reducers'
import { loadLanguage } from 'actions/i18n/i18n'
import I18nProvider from 'containers/i18n/i18nProvider'
import Context from 'containers/context'

import 'babel-polyfill'
require( 'smoothscroll-polyfill' ).polyfill()

const store = createStore( coastwards, compose(

	applyMiddleware( thunk )

) )


//load negotiated language
const [ navigatorLocale ] = window.navigator.language.split ( '-' )
const negotiatedLocale = document.documentElement.getAttribute( 'lang' )
store.dispatch( loadLanguage( negotiatedLocale || navigatorLocale ) )


const render = ( ) => {
	
	ReactDOM.render(
		<AppContainer>
			<Provider store={ store } >
				<I18nProvider>
					<Context />
				</I18nProvider>
			</Provider>
		</AppContainer>,

		document.getElementById( 'Body' )

	)

}

render( )

/*// Hot Module Replacement API
if ( module.hot ) {

	module.hot.accept( 'containers/context', () => {

		render( )

	} )

}*/
