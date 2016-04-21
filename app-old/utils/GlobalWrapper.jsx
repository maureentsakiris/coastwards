import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'underscore';

import Modernizr from 'modernizr';

import Progressbar from './MDL/Progressbar';
import Dialog from './MDL/Dialog/Dialog';
import SnackbarFix from './MDL/SnackbarFix';


Modernizr.addTest( 'draganddrop', function () {

	return true;

} )


export default class GlobalWrapper extends Component {

	static propTypes = {

		children: PropTypes.node

	}

	static childContextTypes = {

		showDialog: PropTypes.func,
		showLoader: PropTypes.func,
		showSnackbar: PropTypes.func,
		draganddrop: PropTypes.bool

	};

	getChildContext = function ( ){

		return {

			showLoader: this._showLoader.bind( this ),
			showDialog: this._showDialog.bind( this ),
			showSnackbar: this._showSnackbar.bind( this ),
			draganddrop: Modernizr.draganddrop

		};

	};

	componentDidMount (){

		// this._showDialog( { title: "HEYHO", msg: "GOOOOOOOD MORNING KIEEEEEEEL!!" } );
		// this._showSnackbar( { active: true, msg: "Yoyoyoyo" } );

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

			showLoader: true,
			trigger: 0,
			mountDialog: false,
			dialog: {},
			mountSnackbar: false,
			snackbar: {}

		}

	}

	render () {

		return (

			<div id="GlobalWrapper">
				<Progressbar show={ this.state.showLoader } className="globalProgressbar" />
				{ this.props.children }
				{ this.state.mountDialog && ( <Dialog { ...this.state.dialog } /> ) }
				{ this.state.mountSnackbar && ( <SnackbarFix { ...this.state.snackbar } /> ) }
			</div>

		)

	}

	_showLoader ( bool ){

		this.setState( { showLoader: bool } );

	}

	_showDialog ( options ){

		this.setState( { dialog: options, mountDialog: true, trigger: _.uniqueId() } );

	}

	_showSnackbar ( options ){

		this.setState( { snackbar: options, mountSnackbar: true, trigger: _.uniqueId() } );

	}

}