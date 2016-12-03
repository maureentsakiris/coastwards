import React, { PropTypes } from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'

import TOGGLE from 'components/ui/toggle'
import P from 'components/tags/p'
import H from 'components/tags/h'
import A from 'components/tags/a'
import STRONG from 'components/tags/strong'
import BR from 'components/tags/br'

import style from './_team'

const messages = defineMessages( {

	who_are_you:{
		id: "who_are_you",
		description: "Section header - Who is Science?",
		defaultMessage: "Who's Science?"
	},
	hi_there:{
		id: "hi_there",
		description: "Paragraph",
		defaultMessage: "We are the 'Coastal Risks and Sea-Level Rise Research Group' at the University of Kiel in Germany and this project is funded by the 'Future Ocean Excellence Cluster'."
	},
	we_are:{
		id: "we_are",
		description: "Paragraph",
		defaultMessage: "I'm Maureen, the project leader and this is the team of scientists:"
	},
	who_are_you_title:{
		id: "who_are_you_title",
		description: "Section header - Meet us!",
		defaultMessage: "Meet us!"
	},

	//team
	more:{
		id: "more",
		description: "Team",
		defaultMessage: "More"
	},
	more_title:{
		id: "more_title",
		description: "Title - ",
		defaultMessage: "A bit more official ..."
	},

	nassos:{
		id: "nassos",
		description: "Team",
		defaultMessage: "Nassos is the group leader and a professor at the University of Kiel. He's greek, has two little boys and his desk looks like hell."
	},
	nassos_official:{
		id: "nassos_official",
		description: "Team",
		defaultMessage: 'Nassos has participated as a principal investigator in a number of collaborative research projects. He has co-authored peer-reviewed articles, book chapters and scientific reports and has also contributed to the Stern Review on the Economics of Climate Change and to the Fifth Assessment Report of the IPCC WGII. His teaching includes modules on “Climate Change”, “Coastal Zone Dynamics”, “Applications of GIS in coastal regions” and “Coasts of the World".'
	},
	claudia:{
		id: "claudia",
		description: "Team",
		defaultMessage: "Claudia is Doctoral Researcher and she is the rising star that will turn your images into something meaningful. She's a charming though questioner and eager to learn for herself. She's also always the first to laugh."
	},
	claudia_official:{
		id: "nassos_official",
		description: "Team",
		defaultMessage: 'Nassos has participated as a principal investigator in a number of collaborative research projects. He has co-authored peer-reviewed articles, book chapters and scientific reports and has also contributed to the Stern Review on the Economics of Climate Change and to the Fifth Assessment Report of the IPCC WGII. His teaching includes modules on “Climate Change”, “Coastal Zone Dynamics”, “Applications of GIS in coastal regions” and “Coasts of the World".'
	},
	joern:{
		id: "joern",
		description: "Team",
		defaultMessage: "Jörn is probably the least stressed father of 4 you have ever met. He's very tall with hair down to his hips and kindly stoops down when he talks to people."
	},
	joern_official:{
		id: "nassos_official",
		description: "Team",
		defaultMessage: 'Nassos has participated as a principal investigator in a number of collaborative research projects. He has co-authored peer-reviewed articles, book chapters and scientific reports and has also contributed to the Stern Review on the Economics of Climate Change and to the Fifth Assessment Report of the IPCC WGII. His teaching includes modules on “Climate Change”, “Coastal Zone Dynamics”, “Applications of GIS in coastal regions” and “Coasts of the World".'
	},
	me:{
		id: "me",
		description: "Team",
		defaultMessage: "That's me. I'm not a scientist and I'm responsible for any typos or anything else that's wrong about this website. And I am crazy enough to believe that people will upload pictures to protect their coasts from sea-level rise. Don't make me turn my back on society and go live in a cabin in the woods!"
	},
	me_official:{
		id: "me_official",
		description: "Team",
		defaultMessage: 'Nassos has participated as a principal investigator in a number of collaborative research projects. He has co-authored peer-reviewed articles, book chapters and scientific reports and has also contributed to the Stern Review on the Economics of Climate Change and to the Fifth Assessment Report of the IPCC WGII. His teaching includes modules on “Climate Change”, “Coastal Zone Dynamics”, “Applications of GIS in coastal regions” and “Coasts of the World".'
	},

	//and
	contact_here:{
		id: "contact_here",
		description: "Contact",
		defaultMessage: "Contact us here"
	}

} )

const team = ( { intl/*, showDialog*/, addSnackbarMessage } ) => {

	const { formatMessage } = intl

	return(

		<TOGGLE id="Team" title={ formatMessage( messages.who_are_you_title ) } priority={ 3 } text={ formatMessage( messages.who_are_you ) } className={ style.toggle } >
			<P><STRONG>{ formatMessage( messages.hi_there ) }</STRONG></P>
			<H priority={ 4 }>Athanasios Vafeidis</H>
			<P>{ formatMessage( messages.nassos ) } <A href="#" title={ formatMessage( messages.more_title ) } onClick={ addSnackbarMessage.bind( this, 'there_will_be_more' ) } >{ formatMessage( messages.more ) }</A></P>
			<H priority={ 4 }>Claudia  Wolff</H>
			<P>{ formatMessage( messages.claudia ) } <A href="#" title={ formatMessage( messages.more_title ) } onClick={ addSnackbarMessage.bind( this, 'there_will_be_more' ) } >{ formatMessage( messages.more ) }</A></P>
			<H priority={ 4 }>Jörn Schmidt</H>
			<P>{ formatMessage( messages.joern ) } <A href="#" title={ formatMessage( messages.more_title ) } onClick={ addSnackbarMessage.bind( this, 'there_will_be_more' ) } >{ formatMessage( messages.more ) }</A></P>
			<H priority={ 4 }>Maureen Tsakiris</H>
			<P>{ formatMessage( messages.me ) } <A href="#" title={ formatMessage( messages.more_title ) } onClick={ addSnackbarMessage.bind( this, 'there_will_be_more_maybe' ) } >{ formatMessage( messages.more ) }</A></P>
			<BR/>
			<P><STRONG>{ formatMessage( messages.contact_here ) }:</STRONG> <A href="mailTo:go@coastwards.org" >go@coastwards.org</A></P> 
		</TOGGLE>

	)

}

team.propTypes = {

	intl: intlShape.isRequired,

	/*showDialog: PropTypes.func,*/
	addSnackbarMessage: PropTypes.func

}

export default injectIntl( team ) 