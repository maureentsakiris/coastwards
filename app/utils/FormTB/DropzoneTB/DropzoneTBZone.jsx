import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';

import style from './_styleDropzoneTBZone';

export default class DropzoneTBZone extends Component {

	static propTypes = {

		onDrop: PropTypes.func.isRequired,
		onClick: PropTypes.func.isRequired,
		prompt: PropTypes.string

	};

	static contextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
	}

	componentDidMount ( ){

		window.addEventListener( 'dragover', ( e ) => {

			e = e || event;
			e.preventDefault();

		}, false );

		window.addEventListener( 'dragenter', ( e ) => {

			e = e || event;
			e.preventDefault();

			this.setState( { isDragActive: true, ripple: false } );

		}, false );

		window.addEventListener( 'drop', ( e ) => {

			e = e || event;
			e.preventDefault();

		}, false );

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			isDragActive: false,
			ripple: false,
			dropX: 0,
			dropY: 0

		}

	}

	render () {

		const { prompt, onClick } = this.props;
		const { dropX, dropY } = this.state;

		const dropzoneHandlers = {

			onDragEnter: this._onDragEnter.bind( this ),
			onDragLeave: this._onDragLeave.bind( this ),
			onDrop: this._onDrop.bind( this ),
			onClick: onClick

		}

		const cls = Classnames( style.zone, {

			[ style.dragactive ]: this.state.isDragActive,
			[ style.hasDrop ]: this.state.ripple

		} )

		const clsRippler = Classnames( style.rippler, {

			[ style.ripple ]: this.state.ripple

		} )

		return (

			<div className={ cls } { ...dropzoneHandlers }>
				<p>{ prompt }</p>
				<div className={ clsRippler } style={{ position: 'absolute', top: dropY, left: dropX } } ></div>
			</div>

		)

	}

	_onDragEnter ( e ){

		e.preventDefault();
		this.setState( { isDragActive: true } );

	}

	_onDragLeave ( e ){

		e.preventDefault();
		this.setState( { isDragActive: false } );

	}

	_onDrop ( e ){

		e.preventDefault();

		let { left, top } = ReactDOM.findDOMNode( this ).getBoundingClientRect();
		let { pageX, pageY } = e;
		let dropX = pageX - left - window.scrollX;
		let dropY = pageY - top - window.scrollY;

		this.setState( { 

			isDragActive: false,
			ripple: true,
			dropX: dropX, 
			dropY: dropY

		} );

		this.props.onDrop( e );

	} 

}
