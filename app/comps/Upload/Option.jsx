import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';

import style from './_styleOption';

export default class Option extends Component {

	static propTypes = {

		className: PropTypes.string,
		selected: PropTypes.bool.isRequired,
		value: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onClick: PropTypes.func.isRequired

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

		const { className, selected, value, label, onClick, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		
		const cls = Classnames( className, style.option, {

			[ style.selected ]: selected

		} );
		
		const icon = selected ? 'radio_button_checked' : 'radio_button_unchecked';

		return (

			<div { ...restProps } className={ cls } onClick={ onClick.bind( this, value ) }>
				<div className={ style.iconRadio }>
					<i className="material-icons">{ icon }</i>
				</div>
				<div className={ style.label }>
					<p>{ label }</p>					
				</div>
			</div>

		)

	}

}
