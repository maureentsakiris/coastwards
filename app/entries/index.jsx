import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import coastwards from 'reducers'
import { loadLanguage } from 'actions'

import I18nProvider from 'containers/I18nProvider'
import Context from 'containers/context'

import I18nLinks from 'components/i18nLinks'
import Intro from 'components/Intro'

//TODO: i18nLinks should handle that itself?
import i18nLocales from 'i18n/i18nLocales'


let store = createStore( 

	coastwards,
	applyMiddleware( thunkMiddleware )

)


//load negotiated language
let negotiatedLocale = document.documentElement.getAttribute( 'lang' );
store.dispatch( loadLanguage( negotiatedLocale ) )


ReactDom.render( 

	<Provider store={ store } >
		<I18nProvider>
			<Context>
				<I18nLinks availableLanguages={ i18nLocales.locales } id="I18n" />
				<Intro />
			</Context>
		</I18nProvider>
	</Provider>, 
	document.getElementById( 'Body' ) 

); 