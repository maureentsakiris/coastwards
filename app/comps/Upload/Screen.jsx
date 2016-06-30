import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import { Button } from 'react-toolbox/lib/button';

import style from './_styleScreen';

export default class Screen extends Component {

	static propTypes = {

		className: PropTypes.string,
		message: PropTypes.string,
		label: PropTypes.string,
		onClick: PropTypes.func,
		active: PropTypes.bool

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

		const { className, message, label, onClick, active, ...restProps } = this.props; // eslint-disable-line no-unused-vars

		const cls = Classnames( className, style.screen, {

			[ style.active ]: active

		} );

		const showButton = label != '' ? true : false;

		return (

			<div { ...restProps } className={ cls } >
				<div>
					<p>{ message }</p>
					{ showButton && <Button label={ label } flat onClick={ onClick } /> }
				</div>
			</div>

		)

	}

}
