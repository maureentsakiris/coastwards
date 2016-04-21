import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';

export default class Button extends Component {

	static propTypes = {

		children: PropTypes.node,
		raise: PropTypes.bool,
		ripple: PropTypes.bool,
		color: PropTypes.bool,
		accent: PropTypes.bool,
		fab: PropTypes.bool,
		icon: PropTypes.bool,
		className: PropTypes.string

	};

	static defaultProps = {

		raise: true,
		ripple: true,
		color: true,
		accent: false,
		fab: false,
		icon: false


	};

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { raise, ripple, color, accent, fab, icon, className, ...props } = this.props;

		const classnames = Classnames( 'mdl-button mdl-js-button', {

			'mdl-button--raised': raise, 
			'mdl-js-ripple-effect': ripple,
			'mdl-button--colored': color,
			'mdl-button--accent': accent,
			'mdl-button--fab': fab,
			'mdl-button--icon': icon

		}, className );

		return (

			<button {...props} className={ classnames } >
				{ this.props.children }
			</button>

		)

	}

}
