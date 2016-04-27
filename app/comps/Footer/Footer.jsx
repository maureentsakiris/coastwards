import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';

import style from './_styleFooter';

export default class Footer extends Component {

	static propTypes = {



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

		}

	}

	render () {

		const cls = Classnames( style.pad, style.footer );

		return (

			<div className={ cls }>
				<p className={ style.corset }>coastwards.org</p>
			</div>

		)

	}

}
