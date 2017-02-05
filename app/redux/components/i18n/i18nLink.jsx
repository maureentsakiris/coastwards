import React, { PropTypes } from 'react'
import Classnames from 'classnames'

import A from 'components/tags/a'

import style from './_i18nLink'

const i18nLinks = ( { children, className, active, hrefLang, onClick } ) => { 

	const cls = Classnames( className, {

		[ style.active ]: active

	} )

	return (

		<A className={ cls } hrefLang={ hrefLang } onClick={ onClick } >{ children }</A>

	)	

}

i18nLinks.propTypes = {

	children: PropTypes.node,
	className: PropTypes.string,

	active: PropTypes.bool,
	hrefLang: PropTypes.string,

	onClick: PropTypes.func

}

export default i18nLinks