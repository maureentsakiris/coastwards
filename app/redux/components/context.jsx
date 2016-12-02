import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'
import { scrollToId } from 'actions/context'
import Classnames from 'classnames'
import DIV from 'components/tags/div'

import Main from 'containers/main/main'
import Snackbar from 'containers/ui/snackbar'
import Dialog from 'containers/ui/dialog'


import How from 'components/info/how'
import Guidelines from 'components/info/guidelines'
import Team from 'containers/info/team'
import FAQs from 'components/info/faqs'
import Ask from 'components/info/ask'
 

import A from 'components/tags/a'
import I from 'components/tags/i'
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


	// HOW

	how:{
		id: "how",
		description: "Section header - How does my picture help",
		defaultMessage: "How does my picture help?"
	},
	how_title:{
		id:"how_title",
		description: "Section header title - Watch a video (2min)",
		defaultMessage: "Watch a video (1min)"
	},

	//script
	sea_levels_rise_because:{
		id: "sea_levels_rise_because",
		description: "Script - Sea-levels rise because ice melts and our oceans absorb the excess heat and expand - a process that will take centuries to play out.",
		defaultMessage: "Sea-levels rise because ice melts and our oceans absorb the excess heat and expand - a process that will take centuries to play out."
	},
	only:{
		id:"only",
		description: "Script - Only, it doesn’t play out evenly.",
		defaultMessage: "Only, it doesn’t play out evenly."
	},
	sea_levels_rise_vary_drastically:{
		id: "sea_levels_rise_vary_drastically",
		description: "Script - Sea-levels vary drastically from place to place and every coast responds differently depending on what it is made of and what we have made of it.",
		defaultMessage: "Sea-levels vary drastically from place to place and every coast responds differently depending on what it is made of and what we have made of it. Many submerge but some subside, and some even uplift! Some are at low risk and unpopulated while others are at high risk and overpopulated."
	},
	forget_bathtub:{
		id: "forget_bathtub",
		description: "Script - So forget that bathtub image. It’s more complicated than that.",
		defaultMessage: "So forget that bathtub image. It’s more complicated than that."
	},
	/*why:{
		id: "why",
		description: "Script - WHy?",
		defaultMessage: "Why?"
	},*/
	in_a_nutshell:{
		id: "in_a_nutshell",
		description: "Script - In a nutshell, it gives science what satellites cannot: A close-up image of a coast. The possibility to study the bigger picture, in as much detail as possible.",
		defaultMessage: "In a nutshell, it gives science what satellites cannot: A close-up image of a coast. The possibility to study the bigger picture, in as much detail as possible."
	},
	how_it_works:{
		id: "how_it_works",
		description: "Script - Here is how it works",
		defaultMessage: "Here is how it works."
	},
	place_on_map:{
		id: "place_on_map",
		description: "Script - First, it will be checked for information on the location it was taken, so we can place it on a map.",
		defaultMessage: "First, your image will be checked for information on the location it was taken, so we can place it on a map."
	},
	determine_coastal_type:{
		id: "determine_coastal_type",
		description: "Script - Then, it will be analysed by scientists and citizen scientists to determine the coastal type at that location.",
		defaultMessage: "Then, it will be analysed by scientists and citizen scientists to determine the coastal type at that location."
	},
	the_more_the_better:{
		id: "the_more_the_better",
		description: "Script - The more images are analysed, the more detail is added to a global map of what types exists and where.",
		defaultMessage: "The more images are analysed, the more detail is added to a global map of what types of coasts exists and where."
	},
	computer_programs:{
		id: "computer_programs",
		description: "Script - This map is then fed into computer programs, called integrated assessment models, that help scientists make predictions on how different coasts respond under different circumstances.",
		defaultMessage: "This map is then fed into computer programs, called integrated assessment models, that help scientists make predictions on how different coasts respond under different circumstances."
	},
	policy_makers:{
		id: "policy_makers",
		description: "Script - And these predictions inform policy makers at national and international levels on which actions to take and which countries need international support.",
		defaultMessage: "And these predictions inform policy makers at national and international levels on which actions to take and which countries need international support."
	},
	best_advice:{
		id: "best_advice",
		description: "Script - So, your images help science give their best advice on how to protect ourselves, our children and our grandchil- dren from sea-level rise.",
		defaultMessage: "So, your images help scientists give their best advice on how to protect ourselves, our children and our grandchildren from sea-level rise."
	},
	together:{
		id: "together",
		description: "Script",
		defaultMessage: "Together we can create this global map of coasts. And together we can deal with climate change. Let's send that signal."
	},
	seriously:{
		id: "seriously",
		description: "Script",
		defaultMessage: "Seriously, wouldn't that be a beautiful signal to send? One of global collaboration in the face of climate change?"
	},
	easy_beautiful_meaningful:{
		id: "easy_beautiful_meaningful",
		description: "Script - Together we can create this map. It's easy. It's beautiful. And it will make a difference!",
		defaultMessage: "Together we can create this global map of coasts. It's easy. It's beautiful. And it will make a difference!"
	},
	send_a_signal:{
		id: "send_a_signal",
		description: "Script - Let's send a signal and work together. It's simple. And beautiful, too.",
		defaultMessage: "Help us send a signal. Of love, hope, solidarity. It's simple (for you). And beautiful, too."
	}

} )
 
const context = ( { intl, lang, dir, jazzSupported, clipped, unclipPage } ) => {

	const { formatMessage } = intl

	if( !jazzSupported ){

		return(

			<DIV lang={ lang } dir={ dir } >
				<DIV id="Intro" className={ style.introNoJazz } >
					<IMG src="./assets/turtle.svg" alt="Logo coastwards: A turtle on a mission" />
					<H priority={ 1 } ><span>{ formatMessage( messages.help_science ) }</span> <span>{ formatMessage( messages.by ) }</span></H>
					<H priority={ 2 } >{ formatMessage( messages.no_account ) }</H>
				</DIV>
				<DIV id="Info" className={ style.infoNoJazz } >
					<How />
					<Guidelines />
					<Team />
					<FAQs />
					<Ask />
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

		let clsInfo = Classnames( style.info, {

			[ style.clip ]: clipped

		} )

		return(

			<DIV lang={ lang } dir={ dir } >
				<DIV id="Intro" className={ clsIntro }>
					<IMG src="./assets/turtle-white.svg" alt="Logo coastwards: A turtle on a mission" className={ style.logo } />
					<H priority={ 1 } className={ style.headline } ><span>{ formatMessage( messages.help_science ) }</span> <span>{ formatMessage( messages.by ) }</span></H>
					<H priority={ 2 } className={ style.tagline } >{ formatMessage( messages.no_account ) }</H>
				</DIV>
				<DIV id="Info"className={ clsInfo }>
					<How />
					<Guidelines />
					<Team />
					<FAQs />
					<Ask />
					<A onClick={ scrollToId.bind( this, 'Main' ) } className={ style.arrow } >
						<I className="material-icons">&#xE313;</I>
					</A>
				</DIV>
				<DIV id="Main" className={ style.main }>
					<A onClick={ unclipPage.bind( this ) } className={ style.arrow } >
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

	unclipPage: PropTypes.func

}

export default injectIntl( context )