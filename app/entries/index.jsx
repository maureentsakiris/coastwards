import React from 'react'
import ReactDom from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise'
import thunkMiddleware from 'redux-thunk'


import { loadLanguage } from 'actions'

import I18nProvider from 'containers/I18nProvider'
import Context from 'containers/context'

import I18nLinks from 'components/i18nLinks'
import Intro from 'components/Intro'

//TODO: i18nLinks should handle that itself?
import i18nLocales from 'i18n/i18nLocales'

// Reducer
const language = ( state = { locale: 'en', dir: 'ltr', messages: {} }, action ) => {

	switch ( action.type ){

	case 'LOAD_LANGUAGE_FULLFILLED':
		return { ...state, locale: action.locale, messages: action.messages, dir: action.dir }
	case 'LOAD_LANGUAGE_PENDING':
		return { ...state, locale: action.locale, messages: action.messages, dir: action.dir } 
	case 'LOAD_LANGUAGE_REJECTED':
		return { ...state, locale: action.locale, messages: action.messages, dir: action.dir } 
	default:
		return state;

	}

}

const loggerMiddleware = createLogger()

const coastwards = combineReducers( {

	language

} )

let store = createStore( 

	coastwards,
	applyMiddleware( thunkMiddleware, promiseMiddleware )

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