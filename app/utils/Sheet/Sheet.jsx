import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';

import style from './_styleSheet';

export default class Sheet extends Component {

	static propTypes = {

		className: PropTypes.string,
		active: PropTypes.bool.isRequired,
		onEscKeyDown: PropTypes.func,
		onOverlayClick: PropTypes.func,

		children: PropTypes.node.isRequired

	};

	static defaultProps = {

		onOverlayClick: () => {},
		onEscKeyDown: () => {}

	};

	componentDidMount (){

		window.addEventListener( 'keydown', ( e ) => {

			e = e || event;
			e.preventDefault();

			let { active, onEscKeyDown } = this.props;

			if ( e.keyCode == 27 && active ) {

				onEscKeyDown();

			}

		}, false );

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		const { className, active, onEscKeyDown, onOverlayClick, children, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		
		const cls = Classnames( className, style.sheet, {

			[ style.active ]: active

		} );

		const clsPaper = Classnames( style.paper, {

			[ style.show ]: active

		} );

		return (

			<div { ...restProps } className={ cls } onClick={ onOverlayClick }>
				<div className={ clsPaper } >
					{ children }
				</div>
			</div>

		)

	}

}