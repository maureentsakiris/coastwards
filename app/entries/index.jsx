import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import coastwards from 'reducers'
import { loadLanguage } from 'actions/i18n/i18n'

import I18nProvider from 'containers/i18n/i18nProvider'
import Context from 'containers/context/context'
import Main from 'containers/main'
import Snackbar from 'containers/ui/snackbar'
import Dialog from 'containers/ui/dialog'

import I18nLinks from 'components/i18n/i18nLinks'
import Intro from 'components/intro'
import How from 'components/how'
import Guidelines from 'components/guidelines'
import Team from 'components/team'
import FAQs from 'components/faqs'
import Ask from 'components/ask'
import Prompt from 'components/prompt'

import DIV from 'components/tags/div'


//TODO: i18nLinks should handle that itself?
import i18nLocales from 'actions/i18n/i18nLocales'

import style from './_index'


let store = createStore( coastwards, compose(

	applyMiddleware( thunk ),
	window.devToolsExtension ? window.devToolsExtension() : ( f ) => f

) )


//load negotiated language
let negotiatedLocale = document.documentElement.getAttribute( 'lang' );
store.dispatch( loadLanguage( negotiatedLocale ) )


ReactDom.render( 

	<Provider store={ store } >
		<I18nProvider>
			<Context>
				<DIV id="Site"  className={ style.site }>
					<I18nLinks availableLanguages={ i18nLocales.locales } id="I18n" className={ style.center } />
					<Intro />
					<How />
					<Guidelines />
					<Team />
					<FAQs />
					<Ask />
					<Prompt />
					<Main />
				</DIV>
				<Snackbar />
				<Dialog />
			</Context>
		</I18nProvider>
	</Provider>, 
	document.getElementById( 'Body' ) 

); 