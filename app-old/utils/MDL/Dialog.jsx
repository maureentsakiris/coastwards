import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';


export default class Dialog extends Component {

	static propTypes = {

		title: PropTypes.string.isRequired,
		msg: PropTypes.string.isRequired,
		accept: PropTypes.shape( {

			label: PropTypes.string.isRequired,
			onClick: PropTypes.func

		} ),
		cancel: PropTypes.shape( {

			label: PropTypes.string,
			onClick: PropTypes.func

		} )

	};

	static defaultProps = {

		accept: {

			label: 'OK'

		}, 
		cancel: {

			onClick: () => {}

		}

	};


	static contextTypes = {

		showLoader: PropTypes.func

	}

	componentWillMount ( ){

		if ( typeof HTMLDialogElement !== 'function' ) {

			this.context.showLoader( true );

			require.ensure( [ './dialog-polyfill.js' ], ( require ) => {

				require( './dialog-polyfill.css' );
				this.dialogPolyfill = require( './dialog-polyfill.js' );

				this.setState( { hasPolyfill: true } );

				this.context.showLoader( false );

			}, 'dialog-polyfill' );

		}else{

			this.setState( { hasPolyfill: true } );

		}


	}

	componentDidMount ( ){

		if( this.state.hasPolyfill ){

			let dialog = this.refs.dialog;
			dialog.showModal();			

		}

	}

	componentDidUpdate ( ){

		let dialog = this.refs.dialog;

		if( this.state.hasPolyfill && this.dialogPolyfill && !dialog.showModal ) {

			this.dialogPolyfill.registerDialog( dialog );

		}

		if( this.state.hasPolyfill ) {

			dialog.showModal();

		}

	}


	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );
		this.dialogPolyfill;
		
		this.state = {

			hasPolyfill: false

		}

	}

	render () {

		const { title, msg, accept, cancel } = this.props;

		let classnames = Classnames( {

			'mdl-dialog': true,
			'polyfill': !this.state.hasPolyfill

		} )

		return (

			<dialog ref="dialog" className={ classnames }>
				<h4 className="mdl-dialog__title">{ title }</h4>
				<div className="mdl-dialog__content">
					<p>{ msg }</p>
				</div>
				<div className="mdl-dialog__actions">
					<button className="mdl-button mdl-js-button mdl-js-ripple-effect" onClick={ this._close.bind( this, accept ) }>{ accept.label }</button>
					{ cancel.onClick && ( <button className="mdl-button mdl-js-button mdl-js-ripple-effect" onClick={ this._close.bind( this, cancel ) }>{ cancel.label }</button> ) }
				</div>
			</dialog>

		)

	}

	_close ( action ){

		this.refs.dialog.close();

		if( action.onClick ) {

			action.onClick();

		}
		
	}

}
