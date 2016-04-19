import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'underscore';

require ( './style.scss' );

export default class Tabs extends Component {

	static propTypes = {

		children: PropTypes.node

	};

	static defaultProps = {



	};

	static contextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
	}


	componentDidMount ( ){

		window.addEventListener( 'resize', this._updateScroll );
		this._updateScroll();

	}

	componentWillUnmount ( ){

		window.removeEventListener( 'resize', this._updateScroll );

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			scroll: false

		}

	}

	render () {

		const { scroll } = this.state;

		const align = scroll ? 'flex-start' : 'center';
		const visibility = scroll ? 'visible' : 'hidden';

		return (

			<div className="tabcontainer" dir="ltr">
				<div className="tabitem left" ref="left" style={ { visibility: visibility } }>
					<i className="material-icons">&#xE5CB;</i>
				</div>
				<div className="tabitem content tabcontainer" style={ { justifyContent: align } } >
					<div className="tabitem" ref="content">
		
						{ this.props.children }
						
					</div>
				</div>
				<div className="tabitem right" ref="right" style={ { visibility: visibility } }>
					<i className="material-icons">&#xE5CC;</i>
				</div>
			</div>

		)

	}

	_updateScroll = ( ) => {

		let w = window,
			d = document,
			documentElement = d.documentElement,
			body = d.getElementsByTagName( 'body' )[ 0 ],
			width = w.innerWidth || documentElement.clientWidth || body.clientWidth,				
			height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

		let contentWidth = this.refs.content.clientWidth;
		let leftWidth = this.refs.left.clientWidth;
		let rightWidth = this.refs.right.clientWidth;
		// let browserWidth = _.min( [ height, width ] );

		let scroll = width - contentWidth - leftWidth - rightWidth < 0 ? true : false;

		this.setState( { scroll: scroll, w: width } );

	}

}
