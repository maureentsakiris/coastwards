import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import _ from 'underscore';

import Option from './Option';

import style from './_styleOptions';

export default class Options extends Component {

	static propTypes = {

		className: PropTypes.string,
		options: PropTypes.array,
		onChange: PropTypes.func,
		disabled: PropTypes.bool

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

			selected: ''

		}

	}

	render () {

		const { className, options, disabled, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		
		const cls = Classnames( className, style.options, {

			[ style.disabled ]: disabled

		} );

		const optionFields = this._renderOptions( options );

		return (

			<div { ...restProps } className={ cls } >
				{ optionFields }
			</div>

		)

	}

	_renderOptions = ( ) => {

		return _.map( this.props.options, ( option, index ) => {

			let { value, label, description } = option;

			let selected = this.state.selected == value ? true : false;

			return React.createElement( Option, {

				key: index,
				value: value,
				label: label,
				description: description,
				selected: selected,
				onClick: this._handleOptionClick


			} );

		} );

	}

	_handleOptionClick = ( value ) => {

		this.setState( { selected: value }, this.props.onChange( value ) );

	}

}
