import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';

import style from './_styleDropzoneTBZone';

export default class DropzoneTBZone extends Component {

	static propTypes = {

		onDragEnter: PropTypes.func,
		onDragLeave: PropTypes.func,
		onDrop: PropTypes.func.isRequired,
		onClick: PropTypes.func.isRequired,
		isBlocked: PropTypes.bool,

		showRippler: PropTypes.bool,
		showPrompt: PropTypes.bool,
		clsZone: PropTypes.string,
		clsZoneEnter: PropTypes.string,
		clsZoneDrop: PropTypes.string,
		clsZoneBlocked: PropTypes.string,
		promptDrag: PropTypes.string,
		promptDrop: PropTypes.string,
		promptClick: PropTypes.string

	};

	static defaultProps = {

		onDragEnter: () => {},	
		onDragLeave: () => {},
		isBlocked: false,
		showRippler: true,
		showPrompt: true, 
		promptDrag: "Drag & drop your files here (or click)",
		promptDrop: "Now drop!",
		promptClick: "Click to add files"

	};

	static contextTypes = {

		draganddrop: PropTypes.bool

	}

	componentWillMount (){

		let { promptDrag, promptClick } = this.props;
		let prompt = this.context.draganddrop ? promptDrag : promptClick;
		this.promptInit = prompt;
		this.setState( { prompt: prompt } );

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

		this.promptInit;

		this.state = {

			prompt: '',
			isDrag: false,
			isDrop: false,
			dropX: 0,
			dropY: 0

		}

	}

	render () {

		const { onDragEnter, onDragLeave, onDrop, onClick, isBlocked, showRippler, showPrompt, clsZone, clsZoneEnter, clsZoneDrop, clsZoneBlocked, promptDrag, promptDrop, promptClick, ...restProps } = this.props; // eslint-disable-line no-unused-vars
		const { prompt, isDrag, isDrop, dropX, dropY } = this.state;

		const dropzoneHandlers = {

			onDragEnter: !isBlocked && this._onDragEnter.bind( this ),
			onDragLeave: !isBlocked && this._onDragLeave.bind( this ),
			onDrop: !isBlocked && this._onDrop.bind( this ),
			onClick: !isBlocked && onClick

		}

		const cls = Classnames( clsZone, style.zone, {

			[ style.isdrag ]: isDrag,
			[ clsZoneEnter ]: isDrag,
			[ style.isdrop ]: isDrop,
			[ clsZoneDrop ]: isDrop,
			[ style.isblocked ]: isBlocked,
			[ clsZoneBlocked ]: isBlocked

		} )

		const clsPrompt = Classnames( style.prompt, {

		} )

		const clsRippler = Classnames( style.rippler, {

			[ style.ripple ]: isDrop

		} )

		return (

			<div { ...restProps } className={ cls } { ...dropzoneHandlers } data-selector="zone">
				{ showPrompt && <p className={ clsPrompt } data-selector="prompt">{ prompt }</p> }
				{ showRippler && <div className={ clsRippler } style={ { position: 'absolute', top: dropY, left: dropX } } data-selector="rippler" ></div> }
			</div>

		)

	}

	_onDragEnter ( e ){

		e.preventDefault();
		let { onDragEnter, isBlocked, promptDrop } = this.props;
		this.setState( { isDrag: !isBlocked, isDrop: false, prompt: promptDrop }, onDragEnter( e ) );

	}

	_onDragLeave ( e ){

		e.preventDefault();
		let { onDragLeave } = this.props;
		this.setState( { isDrag: false, prompt: this.promptInit }, onDragLeave( e ) );

	}

	_onDrop ( e ){

		e.preventDefault();

		let { onDrop, isBlocked } = this.props;
		let { left, top } = ReactDOM.findDOMNode( this ).getBoundingClientRect();
		let { pageX, pageY } = e;
		let dropX = pageX - left - window.scrollX;
		let dropY = pageY - top - window.scrollY;

		this.setState( { 

			prompt: "",
			isDrag: false,
			isDrop: !isBlocked,
			dropX: dropX, 
			dropY: dropY

		}, onDrop( e ) );


	} 

}
