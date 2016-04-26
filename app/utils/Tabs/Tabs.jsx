import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'underscore';
import Classnames from 'classnames';
import { IconButton } from 'react-toolbox/lib/button';

import style from './_styleTabs';


export default class Tabs extends Component {

	static propTypes = {

		children: PropTypes.node,
		id: PropTypes.string,
		className: PropTypes.string,
		center: PropTypes.bool,
		arrows: PropTypes.bool,
		scrollStep: PropTypes.number

	};

	static defaultProps = {

		arrows: true,
		scrollStep: 100

	};

	static contextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
	}

	componentDidMount ( ){

		window.addEventListener( 'resize', this._update );
		this.contentWidth = this._getContentWidth();
		this.content = this.refs.content;
		this._update();
		this._onScroll();

	}

	componentWillUnmount ( ){

		window.removeEventListener( 'resize', this._update );

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.contentWidth;
		this.content;

		this.state = {

			overflow: false,
			showLeft: false,
			showRight: false

		}

	}

	render () {

		const { center, arrows, scrollStep } = this.props;
		const { showLeft, showRight } = this.state;

		const children = this._extendChildren();

		const cls = Classnames( style.tabcontainer, this.props.className );

		const clsLeft = Classnames( style.tabitem, style.control, {

			[ style.hide ]: !this.state.overflow

		} );
		const clsContent = Classnames( style.tabitem, style.content, style.tabcontainer, {

			[ style.center ]: center && !this.state.overflow

		} );
		const clsRight = Classnames( style.tabitem, style.control, {

			[ style.hide ]: !this.state.overflow

		} );

		return (

			<div id={ this.props.id } className={ cls } dir="ltr">
				{ arrows && <div className={ clsLeft } ref="left">
					<IconButton icon="chevron_left" accent disabled={ !showLeft } onClick={ this._scrollTo.bind( this, -scrollStep ) } />
				</div> }
				<div className={ clsContent } ref="content" onScroll={ this._onScroll } >
					{ children }
				</div>
				{ arrows && <div className={ clsRight } ref="right">
					<IconButton icon="chevron_right" accent  disabled={ !showRight } onClick={ this._scrollTo.bind( this, scrollStep ) } />
				</div> }
			</div>

		)

	}

	_extendChildren = () => {

		return _.map( this.props.children, ( child, key ) => {

			let cls = Classnames( style.tabitem, child.props.className );
			return React.cloneElement( child, { key: key, className: cls } );

		} );

	}

	_getContentWidth = ( ) => {

		var children = this.refs.content.children;
		var totalWidth = 0;

		for ( var i = 0; i < children.length; i++ ) {

			totalWidth += children[ i ].offsetWidth;

		}

		return totalWidth;

	}

	_update = ( ) => {

		let containerWidth = this.refs.content.clientWidth;
		let overflow = containerWidth - this.contentWidth < 0 ? true : false;

		this.setState( { overflow: overflow } );

	}

	_onScroll = ( ) => {

		let canScrollLeft = this.content.scrollLeft > 0;
		let canScrollRight = ( this.content.scrollWidth - ( this.content.scrollLeft + this.content.clientWidth ) ) > 0;

		this.setState( {

			showLeft: canScrollLeft,
			showRight: canScrollRight

		} );

	}

	_scrollTo ( s ){

		this.content.scrollLeft += s;

	}

}
