import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';

import style from './_styleDropzoneTBZone';

export default class DropzoneTBZone extends Component {

	static propTypes = {

		onDrop: PropTypes.func.isRequired,
		onClick: PropTypes.func.isRequired,
		onDragEnter: PropTypes.func,
		onDragLeave: PropTypes.func,
		rippler: PropTypes.bool,
		blocked: PropTypes.bool

	};

	static defaultProps = {

		onDragEnter: () => {},	
		onDragLeave: () => {},
		rippler: true,
		blocked: false

	}


	componentDidMount ( ){

		window.addEventListener( 'dragover', ( e ) => {

			e = e || event;
			e.preventDefault();

		}, false );

		window.addEventListener( 'dragenter', ( e ) => {

			e = e || event;
			e.preventDefault();

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

			isDrag: false,
			isDrop: false,
			dropX: 0,
			dropY: 0

		}

	}

	render () {

		const { onClick, rippler, blocked } = this.props;
		const { isDrag, isDrop, dropX, dropY } = this.state;

		const dropzoneHandlers = {

			onDragEnter: !blocked && this._onDragEnter.bind( this ),
			onDragLeave: !blocked && this._onDragLeave.bind( this ),
			onDrop: !blocked && this._onDrop.bind( this ),
			onClick: !blocked && onClick

		}

		const cls = Classnames( style.zone, {

			[ style.isdrag ]: isDrag,
			[ style.isdrop ]: isDrop,
			[ style.isblocked ]: blocked

		} )

		const clsRippler = Classnames( style.rippler, {

			[ style.ripple ]: isDrop

		} )

		return (

			<div className={ cls } { ...dropzoneHandlers }>
				{ rippler && <div className={ clsRippler } style={ { position: 'absolute', top: dropY, left: dropX } } ></div> }
			</div>

		)

	}

	_onDragEnter ( e ){

		e.preventDefault();
		let { onDragEnter, blocked } = this.props;
		this.setState( { isDrag: !blocked, isDrop: false }, onDragEnter( e ) );

	}

	_onDragLeave ( e ){

		e.preventDefault();
		let { onDragLeave } = this.props;
		this.setState( { isDrag: false }, onDragLeave( e ) );

	}

	_onDrop ( e ){

		e.preventDefault();

		let { onDrop, blocked } = this.props;
		let { left, top } = ReactDOM.findDOMNode( this ).getBoundingClientRect();
		let { pageX, pageY } = e;
		let dropX = pageX - left - window.scrollX;
		let dropY = pageY - top - window.scrollY;

		this.setState( { 

			isDrag: false,
			isDrop: !blocked,
			dropX: dropX, 
			dropY: dropY

		}, onDrop( e ) );


	} 

}
