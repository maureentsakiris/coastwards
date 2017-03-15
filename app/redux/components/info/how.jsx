import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import DIV from 'components/tags/div'
import P from 'components/tags/p'

import style from './_how'

const messages = defineMessages( {

	how:{
		id: "how",
		description: "Section header - How does my picture help",
		defaultMessage: "How does my picture help?"
	},
	how_title:{
		id:"how_title",
		description: "Section header title - Watch a video (2min)",
		defaultMessage: "1min read.Tops"
	},
	show_transcript:{
		id: "show_transcript",
		description: "Section header",
		defaultMessage: "Show transcript"
	},
	hide_transcript:{
		id: "hide_transcript",
		description: " - ",
		defaultMessage: "Hide transcript"
	},


	//script
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
		defaultMessage: "These predictions inform policy makers at national and international levels on which actions to take and which countries need international support."
	},
	best_advice:{
		id: "best_advice",
		description: "Script - So, your images help science give their best advice on how to protect ourselves, our children and our grandchil- dren from sea-level rise.",
		defaultMessage: "So, your images help scientists give their best advice on how to protect ourselves, our children and our grandchildren from sea-level rise."
	}

} )


class How extends Component {

	static propTypes = {

		intl: intlShape.isRequired

	}


	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

		this.state = {

			expanded: false

		}

	}

	render () {

		const { formatMessage } = this.props.intl
		//const { expanded } = this.state

		//const label = expanded ? formatMessage( messages.hide_transcript ) : formatMessage( messages.show_transcript );

		/*<DIV id="Video" className={ style.videoWrapper }>
					<iframe src="https://player.vimeo.com/video/201518019?title=0&byline=0&portrait=0" width="640" height="360" frameBorder="0" allowFullScreen></iframe>
				</DIV>
				<BR/>
				<TOGGLE priority={ 5 } text={ formatMessage( messages.show_transcript ) } >
					<DIV className={ style.script } >
						<P>{ formatMessage( messages.in_a_nutshell ) }</P>
						<P>{ formatMessage( messages.how_it_works ) }</P>
						<P>{ formatMessage( messages.place_on_map ) }</P>
						<P>{ formatMessage( messages.determine_coastal_type ) } { " " } { formatMessage( messages.the_more_the_better ) }</P>
						<P>{ formatMessage( messages.computer_programs ) }</P>
						<P>{ formatMessage( messages.policy_makers ) }</P>
						<P>{ formatMessage( messages.best_advice ) }</P>
					</DIV>
				</TOGGLE>*/

		/*<TOGGLE title={ formatMessage( messages.how_title ) } priority={ 3 } text={ formatMessage( messages.how ) } className={ style.toggle } >
				<DIV className={ style.script } >
					<P>{ formatMessage( messages.in_a_nutshell ) }</P>
					<P>{ formatMessage( messages.how_it_works ) }</P>
					<P>{ formatMessage( messages.place_on_map ) }</P>
					<P>{ formatMessage( messages.determine_coastal_type ) } { " " } { formatMessage( messages.the_more_the_better ) }</P>
					<P>{ formatMessage( messages.computer_programs ) }</P>
					<P>{ formatMessage( messages.policy_makers ) }</P>
					<P>{ formatMessage( messages.best_advice ) }</P>
				</DIV>
			</TOGGLE>*/

			/*<TOGGLE title={ formatMessage( messages.how_title ) } priority={ 3 } text={ formatMessage( messages.how ) } className={ style.toggle } >
				<DIV id="Video" className={ style.videoWrapper }>
					<iframe src="https://player.vimeo.com/video/206066163?color=0076b7&title=0&byline=0&portrait=0" width="640" height="360" frameBorder="0"  allowFullScreen></iframe>
				</DIV>
				<TOGGLE className={ style.toggleScript } priority={ 6 } text={ formatMessage( messages.show_transcript ) } >
					<DIV className={ style.script } >
						<P>{ formatMessage( messages.in_a_nutshell ) }</P>
						<P>{ formatMessage( messages.how_it_works ) }</P>
						<P>{ formatMessage( messages.place_on_map ) }</P>
						<P>{ formatMessage( messages.determine_coastal_type ) } { " " } { formatMessage( messages.the_more_the_better ) }</P>
						<P>{ formatMessage( messages.computer_programs ) }</P>
						<P>{ formatMessage( messages.policy_makers ) }</P>
						<P>{ formatMessage( messages.best_advice ) }</P>
					</DIV>
				</TOGGLE>
			</TOGGLE>*/

		return(

			<DIV className={ style.how } >
				<DIV className={ style.videoDiv } >
					<DIV id="Video" className={ style.videoWrapper }>
						<iframe src="https://player.vimeo.com/video/206066163?color=0076b7&title=0&byline=0&portrait=0" width="640" height="360" frameBorder="0"  allowFullScreen></iframe>
					</DIV>
				</DIV>
			</DIV>

		)


	}

	_toggle = ( e ) => {

		e.preventDefault()
		const { expanded } = this.state
		this.setState( { expanded: !expanded } )

	}

}


export default injectIntl( How ) 