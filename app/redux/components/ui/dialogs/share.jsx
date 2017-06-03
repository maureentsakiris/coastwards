import React from 'react'
import { PropTypes } from 'prop-types'
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl'

import DIV from 'components/tags/div'
import H from 'components/tags/h'
import P from 'components/tags/p'
import BR from 'components/tags/br'
import A from 'components/tags/a'

import style from './_share'


const messages = defineMessages( {

	share_header:{
		id: "share_header",
		description: "Header",
		defaultMessage: "Go coastwards! Share with friends and family."
	},
	share_text_intro:{
		id: "share_text_intro",
		description: "P - ",
		defaultMessage: "There are many ways to share. Of course, there is {facebook} and {twitter}. If you are the next generation you might prefer {whatsapp} or some other programm I don't know about because I'm too old or not familiar with the platforms you use in your country."
	},
	share_text_but:{
		id: "share_text_but",
		description: "P - ",
		defaultMessage: "But we all know how social media works. If you really want to reach someone, talking to that person still is the most effective."
	},
	know_anyone:{
		id: "know_anyone",
		description: "P - ",
		defaultMessage: "Know anyone who lives at the coast?"
	}

} )


const share = ( { intl, className } ) => {

	const { formatMessage } = intl

	return(

		<DIV className={ className } >
			<H priority={ 2 }>{ formatMessage( messages.share_header ) }</H>
			<P><FormattedMessage
					id="share_text_intro"
					values={ {

						facebook: <A className={ style.link } target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A//coastwards.org">FACEBOOK</A>,
						twitter: <A className={ style.link } target="_blank" href="https://twitter.com/home?status=Help%20Science%20study%20the%20risks%20of%20Sea-level%20Rise%20by%20uploading%20pictures%20of%20coasts%20at%20http%3A//coastwards.org">TWITTER</A>,
						whatsapp: <A className={ style.link } href="whatsapp://send?text=http%3A//coastwards.org">WHATSAPP</A>

					} }
				/>
			</P>
			<BR/>
			<P>{ formatMessage( messages.share_text_but ) }</P>
			<BR/>
			<P>{ formatMessage( messages.know_anyone ) }</P>
		</DIV>

	)

}

share.propTypes = {

	intl: intlShape,
	className: PropTypes.string

}

export default injectIntl ( share )
