import React, { Component, PropTypes } from 'react';
import util from 'util';
import _ from 'underscore';

export default class DropzoneTBFile extends Component {

	static propTypes = {

		file: PropTypes.object.isRequired,
		validations: PropTypes.array,
		onValidationDone: PropTypes.func,
		onValidationsDone: PropTypes.func.isRequired

	};

	static defaultProps = {

		validations: {}

	}

	componentWillMount ( ){

		/*require.ensure( [ './FormExif.js' ], ( require ) => {

			let exif =  require( './FormExif.js' );
			this.setState( { exif } );

		}, 'FormExif' );*/
		this._runTests();

	}

	constructor ( props ) {

		super ( props );

		this.state = {

			status: {},
			validations: {}

		}

	}

	/*<p><img width="200" src={ this.props.file.preview } /></p>

<p>STATUS:</p>
					{ status }
	*/

	render () {

		const status = this._getStatus( this.state.status );
		/*const file = this.props.file;*/

		const style = {

			//backgroundImage: util.format( 'url(%s)', file.preview )

		}

		return (

			<div className="dropzoneFile" style={ style }>
				<ul className="mdl-list">
					{ status }
				</ul>
			</div>

		)

	}

	_getStatus ( status ){

		return _.map( status, ( stat, index ) => {

			let result;

			if( stat.result == undefined ){

				result = <div className="mdl-spinner mdl-js-spinner is-active"></div>;

			}else{

				result = stat.passed ? <i className="material-icons mdl-list__item-icon">&#xE5CA;</i> : <i className="material-icons mdl-list__item-icon">&#xE5CD;</i>;

			}

			return (

				<li key={ index } className="mdl-list__item mdl-list__item--two-line">
					<span className="mdl-list__item-primary-content">
						<span>{ stat.label }</span>
						<span className="mdl-list__item-sub-title">{ stat.description }</span>
					</span>
					<span className="mdl-list__item-secondary-content">
						{ result }
					</span>
				</li>

			)

		} );

	}

	_runTests ( ){

		const validatorStack = this.props.validations.slice();

		const runNextTest = ( ) => {

			let test = validatorStack.shift();
			
			if( test ){

				this._runTest ( test, runNextTest );

			}else{

				let countFailed = _.chain( this.props.validations )

				// filter required validations
				.filter( ( validation ) => { 

					return validation.options.required 

				} )

				// return results for required validations
				.map( ( requiredValidation ) => {

					return !!this.state.status[ requiredValidation.methodName ].passed;

				} )

				// filter for failed validations
				.filter( ( passed ) => { 

					return passed === false; 

				} )

				.value();

				let isValidDrop = countFailed.length == 0;

				this.props.onValidationsDone( this, isValidDrop );

			}


		}

		runNextTest();

	}

	_runTest ( test, runNextTest ){

		let { methodName, label, description, success, error, options } = test;

		const method = ImageValidators[ methodName ];

		const callMethod = ( ) => {

			let result = method( this, options );
			let passed = util.isBoolean( options.passesWhen ) ? options.passesWhen === result : result;
			let message = passed ? success : error;

			//this.props.onValidationDone( message );

			status[ methodName ] = { result, passed, message, label, description };
			validations[ methodName ] = { result, passed }
			this.setState( ( state ) => {

				return { 
					status: _.extend( state.status, status ), 
					validations: _.extend( state.validations, validations )
				}

			}, delayMethod( runNextTest ) );

		}

		const delayMethod = ( method ) => {

			setTimeout( method, 0 );

		}

		let status = this.state.status;
		let validations = this.state.validations;
		status[ methodName ] = { label, description };
		this.setState( ( state ) => {

			return { 
				status: _.extend( state.status, status )
			}

		}, delayMethod( callMethod ) );

	}

}

//const hasExif = typeof ( exif ) !== 'undefined';

const ImageValidators = {

	isImage: function ( file ) {

		let flag = !!file;

		return flag;

	},
	imageHasLocation: function ( file ) {

		let flag = !!file;

		return flag;

	},
	imageWithFlash: function (  ) {

		//let flag = !!file;

		return false;

	},
	imageHasColor: function (  ) {

		//let flag = !!file;

		return true;

	}


}
