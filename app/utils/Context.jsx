import React, { Component, PropTypes } from 'react';
/*import PureRenderMixin from 'react-addons-pure-render-mixin';*/
import Modernizr from 'modernizr';
import _ from 'underscore';


import ProgressBar from 'react-toolbox/lib/progress_bar';
import Dialog from 'react-toolbox/lib/dialog';
import Snackbar from 'react-toolbox/lib/snackbar';




Modernizr.addTest( 'draganddrop', function () {

	return true;

} )


export default class Context extends Component {

	static propTypes = {

		children: PropTypes.node

	};

	static childContextTypes = {

		draganddrop: PropTypes.bool,
		showLoader: PropTypes.func,
		showDialog: PropTypes.func,
		showSnackbar: PropTypes.func

	}

	getChildContext = function ( ){

		return {

			draganddrop: Modernizr.draganddrop,
			showLoader: this._showLoader,
			showDialog: this._showDialog,
			showSnackbar: this._showSnackbar

		};

	}

	componentDidMount (){

		// this._showLoader( true );
		// this._showDialog( { title: "HEYHO", content: "GOOOOOOOD MORNING KIEEEEEEEL!!" } );
		// this._showSnackbar( { label: 'this is a snackthis is a snackthis is a snackthis is a snackthis is a snack' } );

	}

	constructor ( props ) {

		super ( props );
		//this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.defaultDialogOptions = {

			active: true,
			type: 'small',
			actions: [

				{ label: "OK", onClick: this._hideDialog }

			],
			onEscKeyDown: this._hideDialog,
			onOverlayClick: this._hideDialog,
			title: '',
			content: '',
			className: ''

		};

		this.defaultSnackbarOptions = {

			active: true,
			type: 'cancel',
			action: 'OK',
			icon: 'help',
			label: '',
			onClick: this._hideSnackbar,
			onTimeout: this._hideSnackbar,
			timeout: 3000,
			className: ''


		}

		this.state = {

			showLoader: false,
			dialogOptions: { active: false },
			snackbarOptions: { active: false }

		}

	}

	render () {

		let { showLoader, dialogOptions, snackbarOptions } = this.state;

		return (

			<div id="Context">
				{ showLoader && <ProgressBar type="linear" mode="indeterminate" /> }
				<Dialog { ...dialogOptions }>{ dialogOptions.content }</Dialog>
				{ this.props.children }
				<Snackbar { ...snackbarOptions } />
			</div>

		)

	}

	_showLoader = ( bool ) => {

		this.setState( { showLoader: bool } );

	}

	_showDialog = ( o ) => {

		let options = _.extend( this.defaultDialogOptions, o );
		this.setState( { showDialog: true, dialogOptions: options } );

	}

	_hideDialog = () => {

		let options = _.extend( this.defaultDialogOptions, { active: false } );
		this.setState( { snackbarOptions: options } );

	}

	_showSnackbar = ( o ) => {

		let max = _.max( [ o.timeout, o.label.length * 100, 3000 ] );
		let options = _.extend( this.defaultSnackbarOptions, o, { timeout: max } );
		this.setState( { snackbarOptions: options } );

	}

	_hideSnackbar = () => {

		let options = _.extend( this.defaultSnackbarOptions, { active: false } );
		this.setState( { snackbarOptions: options } );

	}

}