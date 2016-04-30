import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'underscore';

export default class MapTo extends Component {

	static propTypes = {

		dataArray: PropTypes.array.isRequired,
		children: PropTypes.element.isRequired,
		sortBy: PropTypes.string

	};

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const dataArray = this.props.sortBy ? _.sortBy( this.props.dataArray, this.props.sortBy ) : this.props.dataArray;

		const children = dataArray.map( ( data, index ) => {
					
			return React.cloneElement( this.props.children, {
				key: index,
				data: data
			} );

		} );

		return (

			<div { ...this.props }>
				{ children }
			</div>

		)

	}

}
