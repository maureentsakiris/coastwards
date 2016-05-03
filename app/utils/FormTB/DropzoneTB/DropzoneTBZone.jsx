import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Classnames from 'classnames';
import Ripple from 'react-toolbox/lib/ripple';

import style from './_styleDropzoneTBZone';

class DropzoneTBZone extends Component {

	static propTypes = {

		onDrop: PropTypes.func,
		prompt: PropTypes.string

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

			isDragActive: false

		}

	}

	render () {

		const { prompt } = this.props;
		/*const { dropX, dropY } = this.state;*/

		const dropzoneHandlers = {

			onDragEnter: this._onDragEnter.bind( this ),
			onDragLeave: this._onDragLeave.bind( this ),
			onDrop: this._onDrop.bind( this )

		}

		const cls = Classnames( style.zone, {

			[ style.dragactive ]: this.state.isDragActive

		} )

		return (

			<div className={ cls } { ...dropzoneHandlers }>
				<p>{ prompt }</p>
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

		/*let { clientX, clientY } = e;*/

		/*console.log( e.currentTarget.offsetParent.offsetTop );*/

		this.setState( { 

			isDragActive: false

		} );

		this.props.onDrop( e );

	} 

}

export default Ripple( { centered: false } )( DropzoneTBZone );
