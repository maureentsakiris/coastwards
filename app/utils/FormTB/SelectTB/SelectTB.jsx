import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'underscore';
import { ElementTB } from '../ElementTB/ElementTB';

import Dropdown from 'react-toolbox/lib/dropdown';

/*
 * TODO: Options are created on initial render. Changes will not be reflected. 
 * NOTE: Selected is set in options (e.g. { value: 1, label: 'one', defaultChecked: true } )
*/

class SelectTB extends Component {

	static propTypes = {

		elementHandlers: PropTypes.object.isRequired,
		elementProps: PropTypes.object.isRequired,
		elementStates: PropTypes.object.isRequired,

		options: PropTypes.array.isRequired,
		sortBy: PropTypes.string,
		allowBlank: PropTypes.bool,
		defaultChecked: function ( props, propName ) {

			if ( props[ propName ] ) {

				return new Error( 'Setting defaultChecked will have no effect. Set value instead.' );

			}

		}

	};

	static defaultProps = {

		allowBlank: false

	}


	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { elementHandlers, elementProps, elementStates, options, sortBy, allowBlank, ...props } = this.props;
		const sortedOptions = sortBy ? _.sortBy( options, sortBy ) : options;

		return (

			<Dropdown { ...props } { ...elementProps } { ...elementStates } { ...elementHandlers } source={ sortedOptions } allowBlank={ allowBlank } />

		)

	}

}

export default ElementTB ( SelectTB );
