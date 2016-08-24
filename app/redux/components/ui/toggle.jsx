import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import DIV from 'components/tags/div'
import A from 'components/tags/a'
import H from 'components/tags/h'
import I from 'components/tags/i'

class Toggle extends Component {

	static propTypes = {

		children: PropTypes.node.isRequired,
		priority: PropTypes.number.isRequired,
		text: PropTypes.string.isRequired,
		expanded: PropTypes.bool,
		title: PropTypes.string

	}

	static defaultProps = {

		expanded: false

	}

	constructor ( props ) {

		super ( props )
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this )

		this.state = {

			expanded: this.props.expanded

		}

	}

	render () {

		const { children, priority, text, title, ...restProps } = this.props
		const { expanded } = this.state

		const styleH = {

			marginBottom: '0.2em'

		}

		return (

			<DIV { ...restProps } >
				<A onClick={ this._toggle } title={ title } >
					<H priority={ priority } style={ styleH }>
						{ text } 		
						{ !expanded && <I className="material-icons" style={ { verticalAlign: 'middle' } } >&#xE5CC;</I> }
						{ expanded && <I className="material-icons" style={ { verticalAlign: 'middle' } } >&#xE5CF;</I> }
					</H>
				</A>
				{ expanded && children }
			</DIV>

		)

	}

	_toggle = ( ) => {

		const { expanded } = this.state
		this.setState( { expanded: !expanded } )

	}

}

export default Toggle;