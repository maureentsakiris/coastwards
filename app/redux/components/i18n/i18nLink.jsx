import React from 'react'
import { PropTypes } from 'prop-types'
import Classnames from 'classnames'

import A from 'components/tags/a'

import style from './_i18nLink'

const i18nLinks = ( { children, className, active, hrefLang, loading, onClick } ) => { 

	const cls = Classnames( className, {

		[ style.active ]: active,
		[ style.loading ]: loading

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
	loading: PropTypes.bool,

	onClick: PropTypes.func

}

export default i18nLinks