import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';

export default class Grid extends Component {

	static propTypes = {

		children: PropTypes.node,
		noSpacing: PropTypes.bool

	};

	static defaultProps = {

		noSpacing: false

	};

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { noSpacing, ...props } = this.props;

		const classnames = Classnames( 'mdl-grid', {

			'mdl-grid--no-spacing': noSpacing

		} );

		return (

			<div { ...props } className={ classnames }>
				{ this.props.children }
			</div>

		)

	}

}
