import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';

export default class Cell extends Component {

	static propTypes = {

		children: PropTypes.node,
		col: PropTypes.number,
		desktop: PropTypes.number,
		tablet: PropTypes.number,
		phone: PropTypes.number,
		offset: PropTypes.number,
		offsetDesktop: PropTypes.number,
		offsetTablet: PropTypes.number,
		offsetPhone: PropTypes.number,
		order: PropTypes.number,
		orderDesktop: PropTypes.number,
		orderTablet: PropTypes.number,
		orderPhone: PropTypes.number,
		hideDesktop: PropTypes.bool,
		hideTablet: PropTypes.bool,
		hidePhone: PropTypes.bool,
		stretch: PropTypes.bool,
		top: PropTypes.bool,
		middle: PropTypes.bool,
		bottom: PropTypes.bool,
		className: PropTypes.string

	};

	static defaultProps = {

		col: undefined,
		desktop: undefined,
		tablet: undefined,
		phone: undefined,
		offset: undefined,
		offsetDesktop: undefined,
		offsetTablet: undefined,
		offsetPhone: undefined,
		hideDesktop: false,
		hideTablet: false,
		hidePhone: false,
		stretch: false,
		top: false, 
		middle: false,
		bottom: false

	};

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { col, desktop, tablet, phone, offset, offsetDesktop, offsetTablet, offsetPhone, order, orderDesktop, orderTablet, orderPhone, hideDesktop, hideTablet, hidePhone, stretch, top, middle, bottom, className, ...props } = this.props;

		const classnames = Classnames( 'mdl-cell', {

			[ `mdl-cell--${ col }-col` ]: !!col,
			[ `mdl-cell--${ desktop }-col-desktop` ]: !!desktop,
			[ `mdl-cell--${ tablet }-col-tablet` ]: !!tablet,
			[ `mdl-cell--${ phone }-col-phone` ]: !!phone,
			[ `mdl-cell--${ offset }-offset` ]: !!offset,
			[ `mdl-cell--${ offsetDesktop }-offset-desktop` ]: !!offsetDesktop,
			[ `mdl-cell--${ offsetTablet }-offset-tablet` ]: !!offsetTablet,
			[ `mdl-cell--${ offsetPhone }-offset-phone` ]: !!offsetPhone,
			[ `mdl-cell--order-${ order }` ]: !!order,
			[ `mdl-cell--order-${ orderDesktop }-desktop` ]: !!orderDesktop,
			[ `mdl-cell--order-${ orderTablet }-desktop` ]: !!orderTablet,
			[ `mdl-cell--order-${ orderPhone}-desktop` ]: !!orderPhone,
			'mdl-cell--hide-desktop': hideDesktop,
			'mdl-cell--hide-tablet': hideTablet,
			'mdl-cell--hide-phone': hidePhone,
			'mdl-cell--stretch': stretch,
			'mdl-cell--top': top,
			'mdl-cell--middle': middle,
			'mdl-cell--bottom': bottom

		}, className )

		return (

			<div { ...props } className={ classnames }>
				{ this.props.children }
			</div>

		)

	}

}
