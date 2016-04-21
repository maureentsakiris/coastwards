import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

/*
 * TODO: Currently ToggleLink must be an immediate child of the Toggle component. Though, e.g. sometimes it would be nice to put the link inline with a paragraph 
*/

export default class Toggle extends Component {

	static propTypes = {

		showToToggle: PropTypes.bool,
		children: PropTypes.node

	};

	static defaultProps = {

		showToToggle: false

	};

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			showToToggle: this.props.showToToggle

		}

	}

	render () {

		const children = React.Children.map( this.props.children, ( child, key ) => {

			return React.cloneElement ( child, {
				key: key, 
				showToToggle: this.state.showToToggle,
				toggle: this._toggle.bind( this )
			} );

		} )

		return (

			<div>
				{ children }
			</div>

		)

	}

	_toggle ( ) {

		let flag = this.state.showToToggle ? false : true;
		this.setState( { showToToggle: flag } );

	}

}

export default class ToggleLink extends Component {

	static propTypes = {

		showToToggle: PropTypes.bool,
		toggle: PropTypes.func,
		toggles: PropTypes.bool,
		children: PropTypes.node

	};

	static defaultProps = {

		showToToggle: false,
		toggles: true

	};

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		let flag = this.props.toggles ? !this.props.showToToggle : true;

		return (

			<span>
				{ flag && ( <a onClick={ this.props.toggle.bind( this ) }> { this.props.children } </a> ) }
			</span>

		)

	}

}

export default class ToToggle extends Component {

	static propTypes = {

		showToToggle: PropTypes.bool,
		toggle: PropTypes.func,
		children: PropTypes.node

	};

	static defaultProps = {

		showToToggle: false

	};

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const children = React.Children.map( this.props.children, ( child, key ) => {

			return React.cloneElement( child, {
				key: key, 
				showToToggle: this.props.showToToggle,
				toggle: this.props.toggle.bind( this )
			} );

		} );

		return (

			<span>
				{ this.props.showToToggle && ( <span> { children } </span> ) }
			</span>

		)

	}

}

module.exports.Toggle = Toggle;
module.exports.ToggleLink = ToggleLink;
module.exports.ToToggle = ToToggle;
