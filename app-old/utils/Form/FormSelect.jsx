import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import { FormElement } from './FormElement';
import _ from 'underscore';
import FormSelectOption from './FormSelectOption';

/*
 * TODO: Options are created on initial render. Changes will not be reflected. 
 * NOTE: Selected is set via 'value' prop
 * NOTE: Create optgroups like this: 
 	{ optgroup: 'Second group', options: [
		{ value: '4', label: 'four' },
		{ value: '5', label: 'five' },
		{ value: '6', label: 'six' }
	] }
*/

class FormSelect extends Component {

	static propTypes = {

		elementHandlers: PropTypes.object.isRequired,
		elementProps: PropTypes.object.isRequired,
		labelProps: PropTypes.object.isRequired,
		elementStates: PropTypes.object.isRequired,

		options: PropTypes.array.isRequired,
		sortBy: PropTypes.string,
		prompt: PropTypes.string

	};

	static defaultProps = {

		prompt: ''

	}

	componentWillMount ( ){

		this.children = this._createSelectOptions( this.props.options, this.props.sortBy ); 

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { elementHandlers, elementProps, labelProps, elementStates, ...ownProps } = this.props;

		const { label, htmlFor } = labelProps;
		const { value, showError, errorMsg, elementIsValid, elementIsDisabled } = elementStates;
		const { onChange } = elementHandlers;

		const ownPropsNeeded = _.omit( ownProps, [ 'options' ] );
		const { prompt, ...props } = ownPropsNeeded;

		const cls = Classnames( 'mdl-textfield mdl-textfield--floating-label is-dirty', {

			'is-invalid': !elementIsValid,
			'is-disabled': elementIsDisabled

		} )

		return (

			<div className={ cls }>
				<label className="mdl-textfield__label" htmlFor={ htmlFor }>{ label }</label>
				<select { ...props } { ...elementProps } defaultValue={ value } onChange={ onChange } >
					{ prompt && ( <option value="" >{ prompt }</option> ) }
					{ this.children }
				</select>
				{ showError && ( <span className="mdl-textfield__error">{ errorMsg }</span> ) }
			</div>

		)

	}

	_createSelectOptions ( options, sortBy ){

		let sortedOptions = sortBy ? _.sortBy( options, sortBy ) : options;

		return _.map( sortedOptions, ( data, index ) => {

			if( data.optgroup ){

				let groupOptions = this._createSelectOptions ( data.options, sortBy );
					
				return React.createElement( 'optgroup', {

					key: index,
					label: data.optgroup,
					children: groupOptions

				} );

			}else{

				return React.createElement( FormSelectOption, {

					key: index,
					data: data

				} );

			}

		} );

	}

}

export default FormElement( FormSelect );
