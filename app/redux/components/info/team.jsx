import React from 'react'
import { PropTypes } from 'prop-types'
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import P from 'components/tags/p'
import H from 'components/tags/h'
import A from 'components/tags/a'
import DIV from 'components/tags/div'

import style from './_team'

const messages = defineMessages( {

	who_are_you:{
		id: "who_are_you",
		description: "Section header - Who is Science?",
		defaultMessage: "Who's Science?"
	},
	who_are_you_title:{
		id: "who_are_you_title",
		description: "Section header - Meet us!",
		defaultMessage: "Meet us!"
	},
	we_are:{
		id: "we_are",
		description: "Paragraph",
		defaultMessage: "We are the {crslr} at the University of Kiel in Germany and this project is funded by the {future_ocean}."
	},

	//team
	/*more:{
		id: "more",
		description: "Team",
		defaultMessage: "More"
	},
	more_title:{
		id: "more_title",
		description: "Title - ",
		defaultMessage: "A bit more official ..."
	},*/

	/*nassos:{
		id: "nassos",
		description: "Team",
		defaultMessage: "Nassos is the group leader and a professor at the University of Kiel. He's Greek, has two little boys and his desk looks like hell."
	},
	claudia:{
		id: "claudia",
		description: "Team",
		defaultMessage: "Claudia is a Doctoral Researcher and the rising star who will turn your images into something meaningful. She's a charming tough questioner and eager to learn for herself. She's also always the first to laugh."
	},*/
	/*joern:{
		id: "joern",
		description: "Team",
		defaultMessage: "Jörn is probably the least stressed father of 4 you have ever met. He's very tall with hair down to his hips and kindly stoops down when he talks to people."
	},*/
	/*me:{
		id: "me",
		description: "Team",
		defaultMessage: "That's me. I created this website with a lot of love and endless hours of just staring at it. (Developers: Node, React and Redux ROCK!)"
	},*/

	//and
	/*contact_here:{
		id: "contact_here",
		description: "Contact",
		defaultMessage: "Contact us here"
	},*/
	special_thanks:{
		id: "special_thanks",
		description: "H",
		defaultMessage: "Special thanks to"
	},
	claudio:{
		id: "claudio",
		description:"P",
		defaultMessage: "For translating this site into Spanish"
	},
	bassel:{
		id: "bassel",
		description:"P",
		defaultMessage: "For translating this site into Arabic"
	},
	pholpo:{
		id: "pholpo",
		description: "P - ",
		defaultMessage: "For the explanatory video and general support"
	},
	jing:{
		id: "jing",
		description: "P - ",
		defaultMessage: "For translating this site into Chinese"
	},
	atul:{
		id: "atul",
		description: "P - ",
		defaultMessage: "For translating this site into Hindi"
	},
	diana:{
		id: "diana",
		description: "P - ",
		defaultMessage: "For translating this site into Portuguese"
	},
	hugo:{
		id: "hugo",
		description: "P - ",
		defaultMessage: "For translating this site into French"
	},
	laura:{
		id: "laura",
		description: "P - ",
		defaultMessage: "For translating this site into French"
	},
	legal_notice:{
		id: "legal_notice",
		description: "A - ",
		defaultMessage: "Imprint"
	}

} )

const team = ( { intl, jazzSupported, showDialog } ) => {

	const { formatMessage } = intl

	if( !jazzSupported ){

		return(

			<DIV id="Team" className={ style.noJazz } >
				<H priority={ 3 } >{ formatMessage( messages.who_are_you ) }</H>
				<P><FormattedMessage
					id="we_are"
					values={ { 
						crslr: <a href="http://www.crslr.uni-kiel.de/en/people/" target="_blank" rel="noopener noreferrer" title="Coastal Risks and Sea-level Rise Research Group" >Coastal Risks and Sea-level Rise Research Group</a>, 
						future_ocean: <a href="http://www.futureocean.org" target="_blank" rel="noopener noreferrer" title="Cluster of Excellence 'The Future Ocean'" >Cluster of Excellence "The Future Ocean"</a>
					} }
				/></P>
				<TOGGLE className={ style.thanks } id="Team" priority={ 4 } text={ formatMessage( messages.special_thanks ) } >

					<P><A href="http://www.pholpo.net/" target="_blank">Nicola Scodellaro & Sara Zampieri • pholpo GbR</A> - { formatMessage( messages.pholpo ) }</P>
					<P><A href="https://www.linkedin.com/in/claudio-molinari-4a9a472?trk=hp-identity-name" target="_blank">Claudio Molinari</A> - { formatMessage( messages.claudio ) }</P>
					<P><A href="https://github.com/basselAlshK" target="_blank">Bassel Alsheekh Kassem</A> - { formatMessage( messages.bassel ) }</P>
					<P><A href="https://www.facebook.com/jing.liu.127" target="_blank">Jing Liu</A> - { formatMessage( messages.jing ) }</P>
					<P><A href="https://www.linkedin.com/in/atul-kumar/" target="_blank">Atul Kumar Yadav</A> - { formatMessage( messages.atul ) }</P>

				</TOGGLE>
				<A className={ style.imprint } onClick={ showDialog.bind( this, 'IMPRINT' ) } >{ formatMessage( messages.legal_notice ) }</A>
			</DIV>

		)

	}else{

		return (

			<DIV id="Team" className={ style.jazz } >
				<H priority={ 3 } >{ formatMessage( messages.who_are_you ) }</H>
				<P><FormattedMessage
					id="we_are"
					values={ { 
						crslr: <a href="http://www.crslr.uni-kiel.de/en/people/" target="_blank" rel="noopener noreferrer" title="Coastal Risks and Sea-level Rise Research Group" >Coastal Risks and Sea-level Rise Research Group</a>, 
						future_ocean: <a href="http://www.futureocean.org" target="_blank" rel="noopener noreferrer" title="Cluster of Excellence 'The Future Ocean'" >Cluster of Excellence "The Future Ocean"</a>
					} }
				/></P>
				<TOGGLE className={ style.thanks } id="Team" priority={ 4 } text={ formatMessage( messages.special_thanks ) } >

					<P><A href="http://www.pholpo.net/" target="_blank">Nicola Scodellaro & Sara Zampieri • pholpo GbR</A> - { formatMessage( messages.pholpo ) }</P>
					<P><A href="https://www.linkedin.com/in/claudio-molinari-4a9a472?trk=hp-identity-name" target="_blank">Claudio Molinari</A> - { formatMessage( messages.claudio ) }</P>
					<P><A href="https://github.com/basselAlshK" target="_blank">Bassel Alsheekh Kassem</A> - { formatMessage( messages.bassel ) }</P>
					<P><A href="https://www.facebook.com/jing.liu.127" target="_blank">Jing Liu</A> - { formatMessage( messages.jing ) }</P>
					<P><A href="https://www.linkedin.com/in/atul-kumar/" target="_blank">Atul Kumar Yadav</A> - { formatMessage( messages.atul ) }</P>
					<P>Diana Abreu, Michele Braña Bradin, Sofia Oliveira - { formatMessage( messages.diana ) }</P>
					<P>Hugo Vanhove, <A href="http://elisaganivet.com/" target="_blank">Elisa Ganivet</A> - { formatMessage( messages.hugo ) }</P>
					<P><A href="https://www.planet2084.org" target="_blank">Laura Basconi</A> - { formatMessage( messages.laura ) }</P>

				</TOGGLE>
				<A className={ style.imprint } onClick={ showDialog.bind( this, 'IMPRINT' ) } >{ formatMessage( messages.legal_notice ) }</A>
			</DIV>

		)

	}

}

team.propTypes = {

	intl: intlShape.isRequired,
	jazzSupported: PropTypes.bool,

	showDialog: PropTypes.func

}

export default injectIntl( team ) 
