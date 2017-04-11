import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import Classnames from 'classnames'

//TODO: i18nLinks should handle that itself?
import i18nLocales from 'actions/i18n/i18nLocales'
import I18nLinks from 'components/i18n/i18nLinks'

import Main from 'containers/main/main'
import Snackbar from 'containers/ui/snackbar'
import Dialog from 'containers/ui/dialog'

//import Intro from 'containers/intro/intro'
import How from 'containers/info/how'
import Guidelines from 'containers/info/guidelines'
import Team from 'containers/info/team'
import Ask from 'containers/info/ask'
 
import DIV from 'components/tags/div'
import A from 'components/tags/a'
import H from 'components/tags/h'
import IMG from 'components/tags/img'

import style from './_context'


const messages = defineMessages( {

	// INTRO
	help_science:{
		id: "help_science",
		description: "Main Header. Line one",
		defaultMessage: "Help Science study the risks of sea-level rise"
	},
	by:{
		id: "by",
		description: "Main Header. Line two",
		defaultMessage: "by uploading pictures of coasts"
	},
	no_account:{
		id: "no_account",
		description: "Tagline. Informs user that creating an account is not necessary",
		defaultMessage: "No account. Just drag & drop"
	},
	more_info:{
		id: "more_info",
		description: "A",
		defaultMessage: "More info"
	}

} )
 
const context = ( { intl, lang, dir, jazzSupported, clipped, infosState, setInfosState } ) => {

	const { formatMessage } = intl

	let clsInfo = Classnames( style.info, {

		[ style.show ]: infosState

	} )

	let clsMore = Classnames( style.more, {

		[ style.show ]: !infosState

	} )

	if( !jazzSupported ){

		return(

			<DIV lang={ lang } dir={ dir } >
				<DIV  className={ style.noJazz } >
					<I18nLinks availableLanguages={ i18nLocales.locales } className={ style.i18n } />
					<DIV className={ style.intro } >
						<IMG className={ style.logo } src="./assets/coastwards.png" alt="Logo coastwards: A turtle on a mission" />
						<H priority={ 1 } className={ style.headline } >{ formatMessage( messages.help_science ) } { formatMessage( messages.by ) }</H>
						<H priority={ 2 } className={ style.tagline } >{ formatMessage( messages.no_account ) }</H>
						<A className={ clsMore } onClick={ setInfosState.bind( this, !infosState ) } >{ formatMessage( messages.more_info ) }</A>
					</DIV>
					<DIV className={ clsInfo }>
						<How />
						<Guidelines />
						<Team />
						<Ask />
					</DIV>
					<Main />
				</DIV>
				<Snackbar />
				<Dialog />
			</DIV>

		)

	}else{

		let clsTop = Classnames( style.top, {

			[ style.show ]: !clipped

		} )

		//<Intro />

		return(

			<DIV lang={ lang } dir={ dir } >
				<DIV className={ style.jazz } >
					<DIV className={ clsTop } >
						<I18nLinks availableLanguages={ i18nLocales.locales } className={ style.i18n } />
						<DIV className={ style.intro } >
							<IMG className={ style.logo } src="./assets/coastwards.svg" alt="Logo coastwards: A turtle on a mission" />
							<H priority={ 1 } className={ style.headline } >{ formatMessage( messages.help_science ) } { formatMessage( messages.by ) }</H>
							<H priority={ 2 } className={ style.tagline } >{ formatMessage( messages.no_account ) }</H>
							<A className={ clsMore } onClick={ setInfosState.bind( this, !infosState ) } >{ formatMessage( messages.more_info ) }</A>
						</DIV>
						<DIV className={ clsInfo }>
							<How />
							<Guidelines />
							<Team />
							<Ask />
						</DIV>
					</DIV>
					<Main />
				</DIV>
				<Snackbar />
				<Dialog />
			</DIV>

		)

	}

}

context.propTypes = {

	intl: intlShape.isRequired,
	lang: PropTypes.string,
	dir: PropTypes.string,
	jazzSupported: PropTypes.bool,
	clipped: PropTypes.bool,
	infosState: PropTypes.bool,

	setInfosState: PropTypes.func

}

export default injectIntl( context )