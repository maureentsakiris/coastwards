import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import Dialog from 'react-toolbox/lib/dialog';

import Input from 'react-toolbox/lib/input';

import style from './_styleDialog';

export default class UploadDropDialog extends Component {

	static propTypes = {

		className: PropTypes.string,
		active: PropTypes.bool,
		dropImage: PropTypes.string,
		uploadLabel: PropTypes.string,
		onUploadClick: PropTypes.func.isRequired,
		cancelLabel: PropTypes.string,
		onCancelClick: PropTypes.func.isRequired

	};

	static defaultProps = {

		active: false,
		type: 'normal'

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

		const { className, dropImage, uploadLabel, onUploadClick, cancelLabel, onCancelClick, ...restProps } = this.props; // eslint-disable-line no-unused-vars

		const cls = Classnames( className, style.dialog );

		const actions = [

			{ label: cancelLabel, onClick: onCancelClick },
			{ label: uploadLabel, onClick: onUploadClick }

		];

		return (

			<Dialog { ...restProps } className={ cls } actions={ actions } onEscKeyDown={ onCancelClick } onOverlayClick={ onCancelClick } >
				{ dropImage && <img src={ dropImage } className={ style.image } /> }
				<div>
					<Input { ...restProps } type="text" value="" />
				</div>
			</Dialog>

		)

	}

}
