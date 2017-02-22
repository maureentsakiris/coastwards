import React, { Component, PropTypes } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Classnames from 'classnames'

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import H from 'components/tags/h'
import I from 'components/tags/i'
import SPAN from 'components/tags/span'

import style from './_toggle'

class Toggle extends Component {

	static propTypes = {

		children: PropTypes.node.isRequired,
		priority: PropTypes.number.isRequired,
		text: PropTypes.string.isRequired,
		expanded: PropTypes.bool,
		title: PropTypes.string,
		className: PropTypes.string

	}

	static defaultProps = {

		expanded: false

	}

	componentWillMount () {

		let direction = document.documentElement.getAttribute( 'dir' )
		this.setState( { dir: direction } )

	}


	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

		this.state = {

			expanded: this.props.expanded,
			dir: 'ltr'

		}

	}

	render () {

		const { children, priority, text, title, className, ...restProps } = this.props
		const { expanded, dir } = this.state

		const clsToggle = Classnames( className, style.toggle )
		const clsIcon = Classnames( "material-icons", style.icon, {

			[ style.rtl ]: dir == 'rtl'

		} )

		const chevron = dir == 'ltr' ? 'chevron_right' : 'chevron_left'

		return (

			<DIV { ...restProps } className={ clsToggle } >
				<A onClick={ this._toggle } title={ title } className={ style.anchor } >
					<H priority={ priority } >
						<SPAN>{ text }</SPAN>	
						{ !expanded && <I className={ clsIcon } >{ chevron }</I> }
						{ expanded && <I className={ clsIcon } >keyboard_arrow_down</I> }
					</H>
				</A>
				{ expanded && <DIV>{ children }</DIV> }
			</DIV>

		)

	}

	_toggle = ( e ) => {

		e.preventDefault()
		const { expanded } = this.state
		this.setState( { expanded: !expanded } )

	}

}

export default Toggle;