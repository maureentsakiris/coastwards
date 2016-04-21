import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';

export default class FormDropzoneZone extends Component {

	static propTypes = {

		onDrop: PropTypes.func

	};

	static defaultProps = {

		onDrop: () => {}

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

	static contextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func
		
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

		const { dropX, dropY } = this.state;

		const dropzoneHandlers = {

			onDragEnter: this._onDragEnter.bind( this ),
			onDragLeave: this._onDragLeave.bind( this ),
			onDrop: this._onDrop.bind( this )

		}

		const cls = Classnames( 'dropper', {

			'is-drag-active': this.state.isDragActive

		} )

		const clsRippler = Classnames( 'rippler', {

			'ripple': this.state.ripple

		} )

		return (

			<div className={ cls } { ...dropzoneHandlers }>
				<i className="material-icons">&#xE147;</i>
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

		let { clientX, clientY } = e;

		console.log( e.currentTarget.offsetParent.offsetTop );

		this.setState( { 

			isDragActive: false, 
			ripple: true,
			dropX: clientX, 
			dropY: clientY 

		} );

		this.props.onDrop( e );

	} 

}
