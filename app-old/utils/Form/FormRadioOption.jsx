import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

/*
 * { value: 1, label: 'one', defaultChecked: 'defaultChecked' }
*/

export default class FormRadioOption extends Component {

	static propTypes = {

		id: PropTypes.number,
		data: PropTypes.shape( {

			value: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ).isRequired,
			label: PropTypes.string.isRequired

		} ),

		name: PropTypes.string.isRequired,
		defaultChecked: PropTypes.string,
		onChange: PropTypes.func.isRequired

	};

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { data, defaultChecked, ...props } = this.props;
		const flag = ( defaultChecked == data.value ) ? true : false;
		const id = this.props.name + '-' + this.props.id;

		return (

			<label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={ id }>
				<input { ...props } type="radio" id={ id } className="mdl-radio__button" value={ data.value } defaultChecked={ flag }  />
				<span className="mdl-radio__label">{ data.label }</span>
			</label>

		)

	}

}
