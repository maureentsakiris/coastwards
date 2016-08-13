import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

import coastwards from 'reducers'
import { loadLanguage } from 'actions'

import I18nProvider from 'containers/i18n/i18nProvider'
import Context from 'containers/context/context'
import Upload from 'containers/upload'

import I18nLinks from 'components/i18n/i18nLinks'
import Intro from 'components/Intro'
import How from 'components/How'
import Guidelines from 'components/Guidelines'
import Team from 'components/Team'
import FAQs from 'components/FAQs'

//TODO: i18nLinks should handle that itself?
import i18nLocales from 'i18n/i18nLocales'


const logger = createLogger()
let store = createStore( 

	coastwards,
	applyMiddleware( thunk, logger )

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
				<How />
				<Guidelines />
				<Team />
				<FAQs />
				<Upload />
			</Context>
		</I18nProvider>
	</Provider>, 
	document.getElementById( 'Body' ) 

); 