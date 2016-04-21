import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import { FormElement } from './FormElement';
import _ from 'underscore';
import FormRadioOption from './FormRadioOption';

/*
 * TODO: Options are created on initial render. Changes will not be reflected. 
 * NOTE: Selected is set in options (e.g. { value: 1, label: 'one', defaultChecked: true } )
*/

class FormRadio extends Component {

	static propTypes = {

		elementHandlers: PropTypes.object.isRequired,
		elementProps: PropTypes.object.isRequired,
		labelProps: PropTypes.object.isRequired,
		elementStates: PropTypes.object.isRequired,

		options: PropTypes.array.isRequired,
		sortBy: PropTypes.string,
		defaultChecked: function ( props, propName ) {

			if ( props[ propName ] ) {

				return new Error( 'Setting defaultChecked will have no effect. Set value instead.' );

			}

		}

	};

	componentWillMount ( ){

		this.children = this._createRadioOptions( this.props.options, this.props.sortBy ); 

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { labelProps, elementStates } = this.props;
		
		const { label, htmlFor } = labelProps;
		const { showError, errorMsg, elementIsValid, elementIsDisabled } = elementStates;

		const cls = Classnames( 'mdl-textfield mdl-textfield--floating-label is-dirty', {

			'is-invalid': !elementIsValid,
			'is-disabled': elementIsDisabled

		} )

		

		return (

			<div className={ cls }>
				<label className="mdl-textfield__label" htmlFor={ htmlFor }>{ label }</label>
				{ this.children }
				{ showError && ( <span className="mdl-textfield__error">{ errorMsg }</span> ) }
			</div>

		)

	}

	_createRadioOptions ( options, sortBy ){

		const propsNeeded = _.omit( this.props, [ 'labelProps' ] );
		let { elementHandlers, elementProps, elementStates, ...props } = propsNeeded;
		let { name, disabled } = elementProps;
		let { onChange } = elementHandlers;
		let { value } = elementStates;

		let sortedOptions = sortBy ? _.sortBy( options, sortBy ) : options;


		return _.map( sortedOptions, ( data, index ) => {

			let FormRadioOptionProps = _.extend( props, {

				key: index,
				id: index,
				data: data,
				name: name,
				defaultChecked: value,
				onChange: onChange,
				disabled: disabled

			} );
					
			return React.createElement( FormRadioOption, FormRadioOptionProps );

		} );

	}

}

export default FormElement( FormRadio );
