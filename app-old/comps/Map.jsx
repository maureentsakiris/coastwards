import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Leaflet from '../utils/Leaflet/Leaflet.jsx';
import Upload from './Upload';

export default class Map extends Component {

	static propTypes = {



	};

	static defaultProps = {



	};

	static contextTypes = {


		
	};

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render ( ) {

		return (

			<div className="map-card mdl-card mdl-shadow--2dp">
				<Leaflet />
			</div>

		)

	}

}

