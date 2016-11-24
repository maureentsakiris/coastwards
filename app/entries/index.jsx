import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

require( 'smoothscroll-polyfill' ).polyfill()

/*import Classnames from 'classnames'*/

import coastwards from 'reducers'
import { loadLanguage } from 'actions/i18n/i18n'
import { showDialog } from 'actions/ui/dialog'
import { scrollToMap } from 'actions/main'

import I18nProvider from 'containers/i18n/i18nProvider'
import Context from 'containers/context/context'
import Main from 'containers/main'
import Snackbar from 'containers/ui/snackbar'
import Dialog from 'containers/ui/dialog'

/*import I18nLinks from 'components/i18n/i18nLinks'*/
import Intro from 'components/intro'
import How from 'components/how'
import Guidelines from 'components/guidelines'
import Team from 'containers/team'
import FAQs from 'components/faqs'
import Ask from 'components/ask'

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import I from 'components/tags/i'


//TODO: i18nLinks should handle that itself?
/*import i18nLocales from 'actions/i18n/i18nLocales'*/

import style from './_index'


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

	store.dispatch( showDialog( 'TESTSITE' ) )

}

// <I18nLinks availableLanguages={ i18nLocales.locales } className={ style.i18n } />

/*let clsIntro = Classnames( style.intro, {

	[ style.introJazz ]: jazzSupported

} )

let clsInfo = Classnames( style.info, {

	[ style.infoJazz ]: jazzSupported

} )*/

const _scrollToMap = () => {

	store.dispatch( scrollToMap() )

}

ReactDom.render( 

	<Provider store={ store } >
		<I18nProvider>
			<Context>
				<DIV className={ style.top } >
					<DIV className={ style.padder } ></DIV>
					<Intro className={ style.intro } />
					<DIV className={ style.info } >
						<How />
						<Guidelines />
						<Team />
						<FAQs />
						<Ask />
					</DIV>
				</DIV>
				<A onClick={ _scrollToMap } className={ style.down } >
					<I className="material-icons">keyboard_arrow_down</I>
				</A>
				<Main className={ style.main } />
				<Snackbar />
				<Dialog />
			</Context>
		</I18nProvider>
	</Provider>, 
	document.getElementById( 'Body' ) 

); 