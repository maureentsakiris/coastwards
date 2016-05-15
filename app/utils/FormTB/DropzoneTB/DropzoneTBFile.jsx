import React, { Component, PropTypes } from 'react';
import util from 'util';
import _ from 'underscore';

const EXIF = require( './EXIF.js' );

/*
 * TODO: DEFAULT IMPLEMENTATION OF FILE LIST!!! (Didn't need it for coastwards - no need - no do )
*/

export default class DropzoneTBFile extends Component {

	static propTypes = {

		file: PropTypes.object.isRequired,
		validations: PropTypes.array.isRequired,
		onTestDone: PropTypes.func.isRequired,
		onValidationDone: PropTypes.func.isRequired

	};

	static defaultProps = {

		validations: {}

	}

	componentWillMount ( ){

		const me = this;
		setTimeout( ( ) => {
			
			EXIF.getData( this.props.file, function ( ) {

				let tags = EXIF.getAllTags( this );
				console.log( tags );
				me.setState( { tags: tags } );

			} );

		}, 300 );

	}

	componentWillUpdate ( p, s ){

		if( s.tags != this.state.tags ){

			this._runTests();

		}

	}

	constructor ( props ) {

		super ( props );

		this.EXIF;

		this.state = {

			status: {},
			validations: {},
			tags: {}

		}

	}

	render () {

		const status = this._getStatus( this.state.status );

		const style = {

			display: 'none'

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

		const { validations, onValidationDone } = this.props;
		const { status } = this.state;

		const validatorStack = validations.slice();

		const abortTests = ( ) => {

			onValidationDone( this, false );

		}

		const runNextTest = ( ) => {

			let test = validatorStack.shift();
			
			if( test ){

				this._runTest ( test, runNextTest, abortTests );

			}else{

				let countFailed = _.chain( validations )

				// filter required validations
				.filter( ( validation ) => { 

					return validation.options.required 

				} )

				// return results for required validations
				.map( ( requiredValidation ) => {

					return !!status[ requiredValidation.methodName ].passed;

				} )

				// filter for failed validations
				.filter( ( passed ) => { 

					return passed === false; 

				} )

				.value();

				let isValidDrop = countFailed.length == 0;

				onValidationDone( this, isValidDrop );

			}


		}

		runNextTest();

	}

	_runTest ( test, runNextTest, abortTests ){

		let { onTestDone } = this.props;
		let { methodName, label, description, success, error, options } = test;

		const method = ImageValidators[ methodName ];

		const callMethod = ( ) => {

			let result = method( this, options );

			let passed = util.isBoolean( options.passesWhen ) ? options.passesWhen === result.flag : result.flag;
			let message = passed ? success : error;

			onTestDone( this, message, passed, result, test );

			let callback = !passed && options.abort ? abortTests : runNextTest;
			status[ methodName ] = { result, passed, message, label, description };
			validations[ methodName ] = { result, passed };
			this.setState( ( state ) => {

				return { 
					status: _.extend( state.status, status ), 
					validations: _.extend( state.validations, validations )
				}

			}, callback );

		}

		let status = this.state.status;
		let validations = this.state.validations;
		status[ methodName ] = { label, description };
		this.setState( ( state ) => {

			return { 
				status: _.extend( state.status, status )
			}

		}, callMethod );

	}

	_toDecimal ( number, ref, l ){

		console.log( ref );

		let decimal = number[ 0 ].numerator + number[ 1 ].numerator / ( 60 * number[ 1 ].denominator ) + number[ 2 ].numerator / ( 3600 * number[ 2 ].denominator );
		let flip = l == 'lat' ? ref == 'N' ? 1 : -1 : ref == 'W' ? -1 : 1;

		console.log( flip );

		return decimal * flip;

	}

}


const ImageValidators = {

	isImage: function ( file ) {

		let flag = !!file;

		let result = {

			flag: flag,
			specs: {}

		}

		return result;

	},
	imageHasLocation: function ( comp, options ) {

		let tags = comp.state.tags;

		let lat = comp._toDecimal( tags.GPSLatitude, tags.GPSLatitudeRef, 'lat' );
		let long = comp._toDecimal( tags.GPSLongitude, tags.GPSLongitudeRef, 'long' );

		let flag = true;

		let result = {

			flag: flag,
			specs: {

				lat: lat,
				long: long

			}

		}

		return result;

	},
	imageWithFlash: function (  ) {

		let flag = false;

		let result = {

			flag: flag,
			specs: {}

		}

		return result;

	},
	imageHasColor: function (  ) {

		let flag = true;

		let result = {

			flag: flag,
			specs: {}

		}

		return result;

	}


}
