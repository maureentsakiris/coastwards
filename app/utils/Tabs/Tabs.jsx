import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'underscore';
import util from 'util';
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
		scrollStep: PropTypes.number,
		activeCls: PropTypes.string,
		active: PropTypes.number,
		accent: PropTypes.bool,
		inverse: PropTypes.bool

	};

	static defaultProps = {

		center: true,
		arrows: true,
		active: 0,
		accent: true,
		inverse: false

	};

	static contextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
	}

	componentDidMount ( ){

		window.addEventListener( 'resize', this._update );
		this.contentWidth = this._getContentWidth();
		this.scrollStep = this.props.scrollStep || this.refs.content.children[ 0 ].offsetWidth;
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
		this.scrollStep;

		this.state = {

			overflow: false,
			showLeft: false,
			showRight: false,
			active: this.props.active

		}

	}

	render () {

		const { center, arrows, accent, inverse } = this.props;
		const { showLeft, showRight } = this.state;

		const children = this._extendChildren();

		const cls = Classnames( style.tabcontainer, this.props.className );

		const clsLeft = Classnames( style.tabitem, style.control, {

			[ style.hide ]: !this.state.overflow

		} );
		const clsContent = Classnames( style.tabitem, style.tabcontent, style.tabcontainer, {

			[ style.center ]: center && !this.state.overflow

		} );
		const clsRight = Classnames( style.tabitem, style.control, {

			[ style.hide ]: !this.state.overflow

		} );

		return (

			<div id={ this.props.id } className={ cls } dir="ltr">
				{ arrows && <div className={ clsLeft } ref="left">
					<IconButton icon="chevron_left" accent={ accent } inverse={ inverse } disabled={ !showLeft } onClick={ this._scrollTo.bind( this, -this.scrollStep ) } />
				</div> }
				<div className={ clsContent } ref="content" onScroll={ this._onScroll } >
					{ children }
				</div>
				{ arrows && <div className={ clsRight } ref="right">
					<IconButton icon="chevron_right" accent={ accent } inverse={ inverse }  disabled={ !showRight } onClick={ this._scrollTo.bind( this, this.scrollStep ) } />
				</div> }
			</div>

		)

	}

	_extendChildren = () => {

		return _.map( this.props.children, ( child, key ) => {

			let ref = util.format( 'tab-%s', key );
			let active = util.format( 'tab-%s', this.state.active );
			let isActive = ref == active ? true: false;
			let cls = Classnames( style.tabitem, child.props.className, {

				[ this.props.activeCls ]: isActive

			} );

			return React.cloneElement( child, { 
				key: key, 
				className: cls,
				ref: ref,
				onClick: this._onClick.bind( this, key, child.props.onClick )
			} );

		} );

	}

	_onClick = ( e, onClick ) => {

		this.setState( { active: e } );
		if( onClick ){

			onClick();

		}

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

		console.log( s );
		this.content.scrollLeft += s;

	}

}
