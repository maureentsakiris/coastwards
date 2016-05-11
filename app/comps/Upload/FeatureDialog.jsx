import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import Dialog from 'react-toolbox/lib/dialog';

import style from './_styleFeatureDialog';

export default class FeatureDialog extends Component {

	static propTypes = {

		className: PropTypes.string,
		active: PropTypes.bool,
		feature: PropTypes.object,
		label: PropTypes.string,
		onClick: PropTypes.func.isRequired

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

		const { className, feature, label, onClick, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		
		const cls = Classnames( className, style );

		const actions = [

			{ label: label, onClick: onClick }

		];

		return (

			<Dialog { ...restProps } className={ cls } actions={ actions } onEscKeyDown={ onClick } onOverlayClick={ onClick } >
				{ feature && <img src={ feature.properties.image } className={ style.image } /> }
				{ feature && <p>{ feature.properties.comment }</p> }
			</Dialog>

		)

	}

}
