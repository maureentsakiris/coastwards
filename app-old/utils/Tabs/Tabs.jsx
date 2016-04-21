import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'underscore';

import Button from '../MDL/Button';

require ( './tabs.scss' );

export default class Tabs extends Component {

	static propTypes = {

		tag: PropTypes.string,
		children: PropTypes.node.isRequired

	};

	static defaultProps = {

		tag: 'div'

	};

	static contextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
	};

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		let tabs = this._createTabs();

		return (

			<div className="tabContainer">
				<Button icon={ true } raise={ false } accent={ true }>
					<i className="material-icons">&#xE5CB;</i>
				</Button>
				<div className="tabs">
					{ tabs }
				</div>
				<Button icon={ true } raise={ false } accent={ true }>
					<i className="material-icons">&#xE5CC;</i>
				</Button>
			</div>

		)

	}

	_createTabs ( ) {

		let { tag, children } = this.props;

		let props = {

			className: 'tabs'

		}

		return _.map( children, ( child, index ) => {

			return React.cloneElement( child, {

				key: index,
				className: 'tab'

			} );

		} );

		//return React.createElement( tag, props, tabChildren );

	}

}
