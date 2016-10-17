import React, { PropTypes } from 'react'

import UL from 'components/tags/ul'
import LI from 'components/tags/li'
import I18nLink from 'containers/i18n/i18nLink'

import style from './_i18nLinks'


const i18nLinks = ( { availableLanguages, id, className } ) => { 

	return (

		<UL id={ id } className={ className } >

			{ availableLanguages.map( ( language, key ) => 

				<LI key={ key } className={ style.i18nLink } >
					<I18nLink locale={ language.locale } title={ language.en } >{ language.name }</I18nLink>
				</LI>

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