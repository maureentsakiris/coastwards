import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Vimeo extends Component {

	static propTypes = {

		vimeoSrc: PropTypes.string,
		className: PropTypes.string

	};

	static defaultProps = {

		className: 'video-wrapper'

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	/*<iframe src={ this.props.vimeoSrc } width="500" height="281" frameBorder="0" webkitallowfullscreen mozallowfullscreen allowFullScreen></iframe>*/

	render () {

		return (

			<div className={ this.props.className }>
				<div style={{ width:500 + 'px', height: 281 + 'px' }}></div>
			</div>

		)

	}

}
