import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { ElementTB } from '../ElementTB/ElementTB';
import _ from 'underscore';

import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';

import style from './_styleRadioTB';

/*
 * TODO: Options are created on initial render. Changes will not be reflected. 
 * NOTE: Selected is set in options (e.g. { value: 1, label: 'one', defaultChecked: true } )
*/

class RadioTB extends Component {

	static propTypes = {

		elementHandlers: PropTypes.object.isRequired,
		elementProps: PropTypes.object.isRequired,
		elementStates: PropTypes.object.isRequired,

		options: PropTypes.array.isRequired,
		sortBy: PropTypes.string,
		defaultChecked: function ( props, propName ) {

			if ( props[ propName ] ) {

				return new Error( 'Setting defaultChecked will have no effect. Set value instead.' );

			}

		}

	}

	componentWillMount ( ){

		this.children = this._createRadioOptions( this.props.options, this.props.sortBy ); 

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { elementHandlers, elementProps, elementStates, ...ownProps } = this.props; // eslint-disable-line no-unused-vars
		const { form, name, label, disabled, className } = elementProps; // eslint-disable-line no-unused-vars
		const { value, showErrors, error, submitting, elementIsValid } = elementStates;	// eslint-disable-line no-unused-vars
		const { ...restProps } = ownProps;

		return (

			<RadioGroup { ...restProps } { ...elementProps } { ...elementStates } { ...elementHandlers } >
				{ this.children }
			</RadioGroup>

		)

	}

	_createRadioOptions ( options, sortBy ){

		let sortedOptions = sortBy ? _.sortBy( options, sortBy ) : options;

		return _.map( sortedOptions, ( data, index ) => {

			let RadioButtonProps = _.extend( {

				key: index,
				id: index,
				label: data.label,
				value: data.value,
				name: this.props.elementProps.name,
				className: style.radio

			} );
					
			return React.createElement( RadioButton, RadioButtonProps );

		} );

	}

}

export default ElementTB ( RadioTB );
