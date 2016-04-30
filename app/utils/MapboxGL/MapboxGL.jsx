import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import MapGL from 'react-map-gl';

import style from './_styleMapboxGL';

export default class MapboxGL extends Component {

	static propTypes = {

		className: PropTypes.string

	};

	static defaultProps = {



	};

	static contextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
	}

	componentDidMount (){

		this._createMap();

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		const { className } = this.props;
		const cls = Classnames( className, style.map );  

		return (

			<MapGL 
				mapboxApiAccessToken="pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpanB0NzgwMjAxZDB0b2tvamNpYXQyeTMifQ.HVQAxH-RQKZBss1u3zIoxA" 
				width={ 900 } 
				height={600} 
				latitude={37.7577} 
				longitude={-122.4376} 
				zoom={1} 
			/>

		)

	}

	_createMap = ( ) => {
 

	}

}
