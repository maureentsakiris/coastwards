import React from 'react'
import { defineMessages, injectIntl, intlShape } from 'react-intl'


import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'
import UL from 'components/tags/ul'
import LI from 'components/tags/li'


import style from './_privacypolicy'

const messages = defineMessages( {

	imprint:{
		id: "imprint",
		description: "H - ",
		defaultMessage: "Imprint"
	},
	disclaimer:{
		id: "disclaimer",
		description: "H",
		defaultMessage: "Disclaimer"
	},
	privacy_policy:{
		id: "privacy_policy",
		description: "H - ",
		defaultMessage: "Privacy Policy"
	}


} )


const privacypolicy = ( { intl } ) => {

	const { formatMessage } = intl

	return(

		<DIV className={style.pp}>

			<H priority={1} >{formatMessage( messages.privacy_policy )} for Coastwards</H>

			<P>Your privacy is of great importance to us. For this reason, participation in Coastwards was kept completely anonymous and does not require an account.</P>
			<P>The information we collect at Coastwards is:</P>
			<UL>
				<LI>the image you take through the App, together with its EXIF data (we strip information on the author, if present)</LI>
				<LI>your location at the time the image was taken</LI>
				<LI>the coast material you define</LI>
				<LI>the comment you leave</LI>
				<LI>your IP Address (we need your IP Address to be able to prove that we are not the source of this information but 'someone else with this IP Address' is)</LI>
			</UL>
			<P>We collect this information by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</P>
			<P>What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</P>
			<P>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</P>
			<P>Our app may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</P>
			<P>Your continued use of our App will be regarded as acceptance of our practices around privacy and personal information. If you have any questions, feel free to contact us.</P>
			<P>This policy is effective as of 8 January 2020.</P>
			

		</DIV>

	)

}

privacypolicy.propTypes = {

	intl: intlShape.isRequired,

}

export default injectIntl( privacypolicy )
