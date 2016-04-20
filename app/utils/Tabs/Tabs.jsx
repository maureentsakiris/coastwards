import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'underscore';
import Classnames from 'classnames';

import style from './_styleTabs';


export default class Tabs extends Component {

	static propTypes = {

		children: PropTypes.node,
		id: PropTypes.string,
		className: PropTypes.string,
		center: PropTypes.bool,
		arrows: PropTypes.bool

	};

	static defaultProps = {

		arrows: true

	};

	static contextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
	}

	componentDidMount ( ){

		window.addEventListener( 'resize', this._update );
		this.contentWidth = this._getContentWidth();
		this._update();

	}

	componentWillUnmount ( ){

		window.removeEventListener( 'resize', this._update );

	}


	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.contentWidth;

		this.state = {

			overflow: false

		}

	}

	render () {

		const { center, arrows } = this.props;

		const children = this._extendChildren();

		const cls = Classnames( style.tabcontainer, this.props.className );

		const clsLeft = Classnames( style.tabitem, style.left, {

			[ style.hide ]: !this.state.overflow

		} );
		const clsContent = Classnames( style.tabitem, style.content, style.tabcontainer, {

			[ style.center ]: center && !this.state.overflow

		} );
		const clsRight = Classnames( style.tabitem, style.right, {

			[ style.hide ]: !this.state.overflow

		} );

		return (

			<div id={ this.props.id } className={ cls } dir="ltr">
				{ arrows && <div className={ clsLeft } ref="left">
					<i className="material-icons">&#xE5CB;</i>
				</div> }
				<div className={ clsContent } ref="content">
					{ children }
				</div>
				{ arrows && <div className={ clsRight } ref="right">
					<i className="material-icons">&#xE5CC;</i>
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

}
