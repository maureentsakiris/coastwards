import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Classnames from 'classnames'
import Modernizr from 'modernizr'
import LABEL from 'components/tags/label'
import SPAN from 'components/tags/span'

import style from './_hoc'

const hoc = ( ComposedComponent ) => class extends Component {

	static displayName = 'formelementHOC'

	static propTypes = {

		form: PropTypes.string.isRequired,
		label: PropTypes.string,
		name: PropTypes.string.isRequired,
		className: PropTypes.string,
		preferPlaceholder: PropTypes.bool,
		children: PropTypes.node,
		inline: PropTypes.bool

	}

	static defaultProps = {

		preferPlaceholder: true

	}

	constructor ( props ) {

		super ( props )

	}

	render () {

		const { form, label, name, className, preferPlaceholder, children, inline } = this.props

		const cls = Classnames( className, style.label, {

			[ style.inline ]: inline

		} )

		const showLabel = !Modernizr.placeholder ? true : preferPlaceholder ? false : true

		return(

			<LABEL htmlFor={ name } form={ form } className={ cls } >
				{ showLabel && <SPAN>{ label }</SPAN> }
				{ children }
				<ComposedComponent hocProps={ this.props } />
			</LABEL>

		)

	}

}

export default hoc