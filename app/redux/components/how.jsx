import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import DIV from 'components/tags/div'
import P from 'components/tags/p'
import H from 'components/tags/h'

import style from '_base'

const messages = defineMessages( {

	how:{
		id: "how",
		description: "Section header - How does my picture help",
		defaultMessage: "How does my picture help?"
	},
	how_title:{
		id:"how_title",
		description: "Section header title - Watch a video (2min)",
		defaultMessage: "Watch a video (2min)"
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
	what_happens:{
		id: "what_happens",
		description: "Script - Here is what is going to happen.",
		defaultMessage: "Here is what's gonna happen."
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
		description: "Script - This map is then fed into computer programs that help scientists make prediction on how different coasts respond under different circumstances.",
		defaultMessage: "This map is then fed into computer programs that help scientists make prediction on how different coasts respond under different circumstances."
	},
	policy_makers:{
		id: "policy_makers",
		description: "Script - These predictions in return inform policy makers at national and international levels on which actions to take and which countries need international support.",
		defaultMessage: "These predictions in return inform policy makers at national and international levels on which actions to take and which countries need international support."
	},
	best_advice:{
		id: "best_advice",
		description: "Script - Your images help science give their best advice on how to best protect ourselves, our children and our grandchil- dren from sea-level rise.",
		defaultMessage: "Your images help scientists give their best advice on how to best protect ourselves, our children and our grandchildren from sea-level rise."
	},
	easy_beautiful_meaningful:{
		id: "easy_beautiful_meaningful",
		description: "Script - Together we can create this map. It's easy. It's beautiful. And it will make a difference!",
		defaultMessage: "Together we can create this map. It's easy. It's beautiful. And it will make a difference!"
	},
	send_a_signal:{
		id: "send_a_signal",
		description: "Script - Let's send a signal and work together. It's simple. And beautiful, too.",
		defaultMessage: "Help us send a signal. Of love, hope, solidarity. It's simple (for you). And beautiful, too."
	}

} )

const how = ( { intl } ) => {

	const { formatMessage } = intl

	/*<P>{ formatMessage( messages.best_advice ) }</P>
				<P>{ formatMessage( messages.sea_levels_rise_because ) }</P>
				<P>{ formatMessage( messages.only ) }</P>
				<P>{ formatMessage( messages.sea_levels_rise_vary_drastically ) }</P>
				<P>{ formatMessage( messages.forget_bathtub ) }</P>
*/

	return(

		<TOGGLE id="How" title={ formatMessage( messages.how_title ) } priority={ 3 } text={ formatMessage( messages.how ) } className={ style.corset } >
			<DIV>
				<P>{ formatMessage( messages.in_a_nutshell ) }</P>
				<P>{ formatMessage( messages.what_happens ) }</P>
				<P>{ formatMessage( messages.place_on_map ) }</P>
				<P>
					{ formatMessage( messages.determine_coastal_type ) } { " " }
					{ formatMessage( messages.the_more_the_better ) }
				</P>
				<P>{ formatMessage( messages.computer_programs ) }</P>
				<P>{ formatMessage( messages.policy_makers ) }</P>
				<P>{ formatMessage( messages.best_advice ) }</P>
			</DIV>
		</TOGGLE>

	)

}

how.propTypes = {

	intl: intlShape.isRequired

}

export default injectIntl( how ) 