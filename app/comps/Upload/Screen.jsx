import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import { Button } from 'react-toolbox/lib/button';
import ProgressBar from 'react-toolbox/lib/progress_bar';

import style from './_styleScreen';

export default class Screen extends Component {

	static propTypes = {

		className: PropTypes.string,
		message: PropTypes.string,
		label: PropTypes.string,
		onClick: PropTypes.func,
		active: PropTypes.bool,
		showLoader: PropTypes.bool,
		progress: PropTypes.number

	};

	static defaultProps = {

		showLoader: false

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

		const { className, message, label, onClick, active, showLoader, progress, ...restProps } = this.props; // eslint-disable-line no-unused-vars

		const cls = Classnames( className, style.screen, {

			[ style.active ]: active

		} );

		const showButton = label != '' ? true : false;
		const mode = progress > 0 && progress < 100 ? 'determinate' : 'indeterminate';

		return (

			<div { ...restProps } className={ cls } >
				<div>
					{ message && <p>{ message }</p> }
					{ showButton && <Button label={ label } flat onClick={ onClick } /> }
					{ showLoader && <ProgressBar type="circular" mode={ mode } value={ progress }  multicolor={ true } /> }
				</div>
			</div>

		)

	}

}
