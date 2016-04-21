import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';


export default class Progressbar extends Component {

	static propTypes = {

		show: PropTypes.bool.isRequired,
		className: PropTypes.string

	};

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () { 

		const cls = Classnames( 'mdl-progress mdl-js-progress mdl-progress__indeterminate', {

			'invisible': !this.props.show

		}, this.props.className );

		return (

			<div className={ cls }></div> 

		)

	}

}
