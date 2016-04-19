import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'underscore';
import Classnames from 'classnames';

require ( './style.scss' );

export default class Tabs extends Component {

	static propTypes = {

		children: PropTypes.node,
		id: PropTypes.string

	};

	static defaultProps = {



	};

	static contextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
	}


	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			scroll: false

		}

	}

	render () {

		const children = this._extendChildren();

		return (

			<div id={ this.props.id } className="tabcontainer" dir="ltr">
				<div className="tabitem left">
					<i className="material-icons">&#xE5CB;</i>
				</div>
				<div className="tabitem content tabcontainer">
					{ children }
				</div>
				<div className="tabitem right">
					<i className="material-icons">&#xE5CC;</i>
				</div>
			</div>

		)

	}

	_extendChildren = () => {

		return _.map( this.props.children, ( child ) => {

			let cls = Classnames( child.className, 'tabitem' );

			return React.cloneElement( child, { className: cls } );

		} );

	}

}
