import React, { Component, PropTypes } from 'react';
/*import PureRenderMixin from 'react-addons-pure-render-mixin';*/
import Modernizr from 'modernizr';
import _ from 'underscore';
import underscoreDeepExtend from 'underscore-deep-extend';
_.mixin( { deepExtend: underscoreDeepExtend( _ ) } );
import ProgressBar from 'react-toolbox/lib/progress_bar';
import Dialog from 'react-toolbox/lib/dialog';
import Snackbar from 'react-toolbox/lib/snackbar';

import style from './_styleContext';


Modernizr.addTest( 'draganddrop', function () {

	return true;

} );

Modernizr.addTest( 'formdata', function () {

	return window.FormData;

} )


export default class Context extends Component {

	static propTypes = {

		children: PropTypes.node,
		className: PropTypes.string

	};

	static childContextTypes = {

		draganddrop: PropTypes.bool,
		showLoader: PropTypes.func,
		showDialog: PropTypes.func,
		getDialogOption: PropTypes.func,
		showSnackbar: PropTypes.func,
		logError: PropTypes.func

	}

	getChildContext = function ( ){

		return {

			draganddrop: Modernizr.draganddrop,
			showLoader: this._showLoader,
			showDialog: this._showDialog,
			getDialogOption: this._getDialogOption,
			showSnackbar: this._showSnackbar,
			logError: this._logError

		};

	}

	componentDidMount (){

		// this._showDialog( { title: "HEYHO", content: "GOOOOOOOD MORNING KIEEEEEEEL!!" } );
		// this._showSnackbar( { label: 'this is a snackthis is a snackthis is a snackthis is a snackthis is a snack' } );

	}

	constructor ( props ) {

		super ( props );
		//this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.defaultDialogOptions = {

			active: true,
			type: 'normal',
			actions: [

				{ label: "OK", onClick: this._hideDialog }

			],
			onEscKeyDown: this._hideDialog,
			onOverlayClick: this._hideDialog,
			title: '',
			content: '',
			className: style.dialog

		};

		this.defaultSnackbarOptions = {

			active: true,
			type: 'accept',
			action: 'OK',
			icon: '',
			label: '',
			onClick: this._hideSnackbar,
			onTimeout: this._hideSnackbar,
			timeout: 3000,
			className: style.snackbar


		}

		this.state = {

			showLoader: false,
			dialogOptions: { active: false },
			snackbarOptions: { active: false }

		}

	}

	render () {

		let { children, className } = this.props;
		let { showLoader, dialogOptions, snackbarOptions } = this.state;

		return (

			<div id="Context" className={ className } >
				{ showLoader && <ProgressBar type="linear" mode="indeterminate" className={ style.contextLoader } /> }
				<Dialog { ...dialogOptions } ><p>{ dialogOptions.content }</p></Dialog>
				{ children }
				<Snackbar { ...snackbarOptions } ref="snackbar" />
			</div>

		)

	}

	_showLoader = ( bool ) => {

		this.setState( { showLoader: bool } );

	}

	_getDialogOption = ( option ) => {

		return this.state.dialogOptions[ option ];

	}

	_showDialog = ( o ) => {

		let defaults = _.clone( this.defaultDialogOptions );
		let options = _.deepExtend( defaults, o );
		this.setState( { dialogOptions: options, showingDialog: true } );

	}

	_hideDialog = () => {

		let options = _.extend( this.state.dialogOptions, { active: false } );
		this.setState( { dialogOptions: options, showingDialog: false } );

	}

	_showSnackbar = ( o ) => {

		let defaults = _.clone( this.defaultSnackbarOptions );
		let max = _.max( [ o.timeout, o.label.length * 100, 3000 ] );
		let options = _.extend( defaults, o, { timeout: max } );

		this.setState( { snackbarOptions: options } );

	}

	_hideSnackbar = () => {

		let options = _.extend( this.state.snackbarOptions, { active: false } );
		this.setState( { snackbarOptions: options } );

	}

	_logError = ( error ) => {

		this._showSnackbar( { label: error, type: 'warning' } );

	}

}







