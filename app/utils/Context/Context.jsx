import React, { Component, PropTypes } from 'react';
/*import PureRenderMixin from 'react-addons-pure-render-mixin';*/
import Modernizr from 'modernizr';
import _ from 'underscore';


import ProgressBar from 'react-toolbox/lib/progress_bar';
import Dialog from 'react-toolbox/lib/dialog';
import Snackbar from 'react-toolbox/lib/snackbar';

import style from './_styleContext';


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
			type: 'accept',
			action: 'OK',
			icon: '',
			label: '',
			onClick: this._hideSnackbar,
			onTimeout: this._hideSnackbar,
			timeout: 3000,
			className: 'snackbar'


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
				{ showLoader && <ProgressBar type="linear" mode="indeterminate" className={ style.contextLoader } /> }
				<Dialog { ...dialogOptions }>{ dialogOptions.content }</Dialog>
				{ this.props.children }
				<Snackbar { ...snackbarOptions } ref="snackbar" className={ style.snackbar } />
			</div>

		)

	}

	_showLoader = ( bool ) => {

		this.setState( { showLoader: bool } );

	}

	_showDialog = ( o ) => {

		let defaults = _.clone( this.defaultDialogOptions );
		let options = _.extend( defaults, o );
		this.setState( { dialogOptions: options } );

	}

	_hideDialog = () => {

		let options = _.extend( this.state.dialogOptions, { active: false } );
		this.setState( { dialogOptions: options } );

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

}







