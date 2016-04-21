import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

/*
 * { value: 1, label: 'one' }
 * NOTE: Selected is set via 'value' prop on FormSelect component
*/

export default class FormSelectOption  extends Component {

	static propTypes = {

		data: PropTypes.shape( {

			value: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ).isRequired,
			label: PropTypes.string.isRequired

		} )

	};

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { data } = this.props;

		return (

			<option value={ data.value }>{ data.label }</option>

		)

	}

}
