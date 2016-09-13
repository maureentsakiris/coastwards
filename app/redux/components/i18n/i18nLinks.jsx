import React, { PropTypes } from 'react'

import UL from 'components/tags/ul'
import LI from 'components/tags/li'
import I18nLink from 'containers/i18n/i18nLink'


const i18nLinks = ( { availableLanguages, id, className } ) => { 

	const styleLI = {

		display: 'inline-block',
		marginRight: '1em'

	}

	return (

		<UL id={ id } className={ className } >
			{ availableLanguages.map( ( language, key ) => 

				<LI key={ key }  style={ styleLI } ><I18nLink locale={ language.locale } title={ language.en } >{ language.name }</I18nLink></LI>

			) }
		</UL>

	)	

}

i18nLinks.propTypes = {

	availableLanguages: PropTypes.array,
	id: PropTypes.string,
	className: PropTypes.string

}

export default i18nLinks