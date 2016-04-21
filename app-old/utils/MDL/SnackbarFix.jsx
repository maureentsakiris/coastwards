import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'underscore';
import classNames from 'classnames';

// This component doesn't use the javascript from MDL.
// This is the expected behavior and the reason is because it's not written in
// a way to make it easy to use with React.
const ANIMATION_LENGTH = 500;


export default class SnackbarFix extends Component {

	static propTypes = {

		action: PropTypes.string,
		msg: PropTypes.string.isRequired,
		active: PropTypes.bool.isRequired,
		onActionClick: PropTypes.func,
		onTimeout: PropTypes.func,
		timeout: PropTypes.number,
		delay: PropTypes.number

	}

	componentWillReceiveProps ( nextProps ) {

		this.queue.push( nextProps );

		if( !this.state.open ){

			this._reset( this.queue.shift() );

		}

	}

	componentDidUpdate () {

		if ( this.timeoutId ) {

			clearTimeout( this.timeoutId );

		}

		if ( this.props.active ) {

			this.timeoutId = setTimeout( this._clearTimer, this.state.timeout );

		}

	}

	componentWillUnmount () {

		if ( this.timeoutId ) {

			clearTimeout( this.timeoutId );
			this.timeoutId = null;

		}

		if ( this.clearTimeoutId ) {

			clearTimeout( this.clearTimeoutId );
			this.clearTimeoutId = null;

		}

	}

	constructor ( props ) {

		super( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this._clearTimer = this._clearTimer.bind( this );
		this.timeoutId = null;
		this.clearTimeoutId = null;
		this.queue = [];

		this.state = {

			open: false, 
			timeout: this.props.timeout || 2750,
			blocked: false,
			props: {}

		};

	}

	render () {

		const { action, active, msg, onActionClick, ...otherProps } = this.state.props;
		const { open } = this.state;

		const classes = classNames( 'mdl-snackbar mdl-js-snackbar', {

			'mdl-snackbar--active': open

		} );

		return (

			<div {...otherProps} ref="snackbar" className={classes} aria-hidden={!open} onMouseOver={ this._blockTimeout.bind( this, true ) } onMouseOut={ this._blockTimeout.bind( this, false ) }>
				<div className="mdl-snackbar__text">{active && msg}</div>
				{active && action && <button className="mdl-snackbar__action" type="button" onClick={onActionClick}>{action}</button>}
			</div>

		);

	}

	_clearTimer () {

		if( this.state.blocked ){

			this.timeoutId = setTimeout( this._clearTimer, this.state.timeout );

		}else{

			this.timeoutId = null;
			this.setState( { open: false } );

			this.clearTimeoutId = setTimeout( () => {

				this.clearTimeoutId = null;
				if( this.props.onTimeout ){

					this.props.onTimeout();

				}

				if( this.queue.length ){

					this._reset( this.queue.shift() );

				}

			}, ANIMATION_LENGTH );

		}

	}

	_blockTimeout ( flag ){

		this.setState( { blocked: flag } );

	}

	_reset ( props ){

		let reset = {

			action: '',
			msg: '',
			active: false,
			onActionClick: null,
			onTimeout: null,
			timeout: 0,
			delay: 0

		}

		let newProps = _.extend( reset, props );

		setTimeout( this._snackAway.bind( this, newProps ), newProps.delay );

	}

	_snackAway ( props ){

		let timeout = _.max( [ props.timeout, props.msg.length * 100, 3000 ] );

		this.setState( {

			open: props.active,
			timeout: timeout,
			props: props
			
		} );

	}

}
