import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import 'actions/ui/scroll'
/*import { scrollToId } from 'actions/context'*/
import Classnames from 'classnames'


//TODO: i18nLinks should handle that itself?
import i18nLocales from 'actions/i18n/i18nLocales'
import I18nLinks from 'components/i18n/i18nLinks'

import Main from 'containers/main/main'
import Snackbar from 'containers/ui/snackbar'
import Dialog from 'containers/ui/dialog'


import How from 'components/info/how'
import Guidelines from 'containers/info/guidelines'
import Team from 'containers/info/team'
import FAQs from 'components/info/faqs'
import Ask from 'containers/info/ask'
import Logos from 'containers/info/logos'
 
import DIV from 'components/tags/div'
import A from 'components/tags/a'
import I from 'components/tags/i'
import H from 'components/tags/h'
import IMG from 'components/tags/img'
import P from 'components/tags/p'

import style from './_context'


const messages = defineMessages( {

	nojazz_text:{
		id: "nojazz_text",
		description: "P - ",
		defaultMessage: "Hmm, looks like you are using an old browser (or a not so old Internet Explorer). This site will work on your browser BUT IT'S SOO MUCH MORE FUN if you switch to a modern browser, plus you can navegate the coasts of this world. Chrome, Firefox or Safari are safe choices, especially if updated to the latest versions."
	},

	arrow_up_title:{
		id: "arrow_up_title",
		description: "Title - ",
		defaultMessage: "Show intro"
	},

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
	we_know:{
		id: "we_know",
		description: "Main Header. Line three",
		defaultMessage: "(we know you have some)"
	},
	no_account:{
		id: "no_account",
		description: "Tagline. Informs user that creating an account is not necessary",
		defaultMessage: "No account. Just drag & drop"
	}

} )
 
const context = ( { intl, lang, dir, jazzSupported, clipped, useraction, scrollY, unclipPage, scrollToMap } ) => {

	const { formatMessage } = intl

	if( !jazzSupported ){

		return(

			<DIV lang={ lang } dir={ dir }>
				<P className={ style.alert } >{ formatMessage( messages.nojazz_text ) }</P>
				<I18nLinks availableLanguages={ i18nLocales.locales } className={ style.i18n } />
				<DIV id="Intro" className={ style.introNoJazz } >
					<IMG src="./assets/coastwards-blue.png" alt="Logo coastwards: A turtle on a mission" />
					<H priority={ 1 } >{ formatMessage( messages.help_science ) } { formatMessage( messages.by ) }</H>
					<H priority={ 2 } >{ formatMessage( messages.we_know ) }</H>
					<H priority={ 3 } >{ formatMessage( messages.no_account ) }</H>
				</DIV>
				<DIV id="Info" className={ style.infoNoJazz } >
					<How />
					<Guidelines />
					<Team />
					<FAQs />
					<Ask />
					<Logos />
				</DIV>
				<Main />
				<Snackbar />
				<Dialog />
			</DIV>

		)

	}else{

		let clsIntro = Classnames( style.intro, {

			[ style.clip ]: clipped

		} )

		const clsArrowMap = Classnames( style.arrow, style.arrowMap, {

			[ style.fixed ]: clipped,
			[ style.hidden ]: useraction == 'uploading'

		} )

		let clsScroll = style.scrollDown

		let clsInfo = Classnames( style.info, {

			[ style.clip ]: clipped 

		} )

		if( document.getElementById( 'Main' ) ){

			let unfix = scrollY + window.innerHeight >= document.getElementById( 'Intro' ).offsetHeight + document.getElementById( 'Info' ).offsetHeight + document.getElementById( 'Scroll' ).offsetHeight

			clsScroll = Classnames( style.scrollDown, {

				[ style.clip ]: clipped,
				[ style.unfix ]: unfix

			} )

			clsInfo = Classnames( style.info, {

				[ style.clip ]: clipped,
				[ style.unfix ]: unfix

			} )

		}

		//<i class="material-icons">&#xE836;</i> &#xE86C;

		return(

			<DIV lang={ lang } dir={ dir } >
				<DIV id="Intro" className={ clsIntro }> 
					<I18nLinks availableLanguages={ i18nLocales.locales } className={ style.i18n } />
					<IMG src="./assets/coastwards-white.svg" alt="Logo coastwards: A turtle on a mission" className={ style.logo } />
					<H priority={ 1 } className={ style.headline} >{ formatMessage( messages.help_science ) } { formatMessage( messages.by ) }</H>
					<H priority={ 2 } className={ style.comment } >{ formatMessage( messages.we_know ) }</H>
					<H priority={ 3 } className={ style.tagline } >{ formatMessage( messages.no_account ) }</H>
				</DIV>
				<DIV id="Info"className={ clsInfo }>
					<How />
					<Guidelines />
					<Team />
					<FAQs />
					<Ask />
					<Logos />
				</DIV>
				<DIV id="Scroll" className={ clsScroll } ><A onClick={ scrollToMap } ><I className="material-icons">&#xE313;</I></A></DIV>
				<DIV id="Main" className={ style.main }>
					<A onClick={ unclipPage.bind( this ) } className={ clsArrowMap } title={ formatMessage( messages.arrow_up_title ) } >
						<I className="material-icons">&#xE316;</I>
					</A>
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
	useraction: PropTypes.string,
	scrollY: PropTypes.number,

	unclipPage: PropTypes.func,
	scrollToMap: PropTypes.func

}

export default injectIntl( context )