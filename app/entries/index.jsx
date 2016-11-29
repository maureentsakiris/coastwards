import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

require( 'smoothscroll-polyfill' ).polyfill()

import coastwards from 'reducers'
import { loadLanguage } from 'actions/i18n/i18n'
import { showDialog } from 'actions/ui/dialog'

import I18nProvider from 'containers/i18n/i18nProvider'
import Context from 'containers/context/context'



//TODO: i18nLinks should handle that itself?
/*import i18nLocales from 'actions/i18n/i18nLocales'*/



const store = createStore( coastwards, compose(

	applyMiddleware( thunk ),
	window.devToolsExtension ? window.devToolsExtension() : ( f ) => f

) )


//load negotiated language
const [ navigatorLocale ] = window.navigator.language.split ( '-' )
const negotiatedLocale = document.documentElement.getAttribute( 'lang' )
store.dispatch( loadLanguage( negotiatedLocale || navigatorLocale ) )

const state = store.getState()
const { jazzSupported } = state.browser

if( !jazzSupported ){

	store.dispatch( showDialog( 'NOJAZZ' ) )

}else{

	//store.dispatch( showDialog( 'TESTSITE' ) )

}

// <I18nLinks availableLanguages={ i18nLocales.locales } className={ style.i18n } />



ReactDom.render( 

	<Provider store={ store } >
		<I18nProvider>
			<Context />
		</I18nProvider>
	</Provider>, 
	document.getElementById( 'Body' ) 

); 