import React, { PropTypes } from 'react'

import Classnames from 'classnames'

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

import style from './_top.scss'


const top = ( { clipped, clipPage } ) => {


	let clsTop = Classnames( style.top, {

		[ style.hide ]: clipped

	} )

	let clsDown = Classnames( style.down, {

		[ style.hide ]: clipped

	} )


	return(

		<DIV className={ clsTop } >
			<DIV className={ style.padder } ></DIV>
			<Intro className={ style.intro } />
			<DIV className={ style.info } >
				<How />
				<Guidelines />
				<Team />
				<FAQs />
				<Ask />
			</DIV>
			<A onClick={ clipPage } className={ clsDown } >
				<I className="material-icons">&#xE313;</I>
			</A>
		</DIV>

	)

}

top.propTypes = {

	clipped: PropTypes.bool,

	clipPage: PropTypes.func

}

export default top
