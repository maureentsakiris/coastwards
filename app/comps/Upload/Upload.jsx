import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';
import _ from 'underscore';
import http from 'http';
import { Button } from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';
import ProgressBar from 'react-toolbox/lib/progress_bar';
const TooltipButton = Tooltip( Button );

import style from './_styleUpload';

import FormTB from '../../utils/FormTB/FormTB/FormTB';
import DropzoneTB from '../../utils/FormTB/DropzoneTB/DropzoneTB';
/*import InputTB from '../../utils/FormTB/InputTB/InputTB';*/
import MapboxGL from '../../utils/MapboxGL/MapboxGL';
import FeatureDialog from './FeatureDialog';
import UploadDropDialog from './UploadDropDialog';

const messages = defineMessages( {

	/*dropzone_prompt_drag:{
		id: "dropzone_prompt_drag",
		description: "0 - ",
		defaultMessage: "Drag your images anywhere onto the map (or click)"
	},*/
	dropzone_prompt_drop:{
		id: "dropzone_prompt_drop",
		description: "0 - ",
		defaultMessage: "And now drop!"
	},
	/*dropzone_prompt_click:{
		id: "dropzone_prompt_click",
		description: "0 - ",
		defaultMessage: "Click anywhere to upload your pictures"
	},*/
	dropzone_warning_accept:{
		id: "dropzone_warning_accept",
		description: "0 - ",
		defaultMessage: "One or more files are not images and will be ignored!"
	},
	dropzone_warning_max:{
		id: "dropzone_warning_max",
		description: "0 - ",
		defaultMessage: "Sorry, we can only process one image at a time! (We are working on it)" 
	},
	dropzone_drop_invalid_title:{
		id: "dropzone_drop_invalid_title",
		description: "0 - ",
		defaultMessage: "Too bad!" 
	},
	mapbox_warning_unsupported_title:{
		id: "mapbox_warning_unsupported_title",
		description: "1 - ",
		defaultMessage: "That's too bad ..."
	},
	mapbox_warning_unsupported_message:{
		id: "mapbox_warning_unsupported_message",
		description: "1 - ",
		defaultMessage: "Your browser does not support the web technology necessary to display the world map. We recommend you upgrade your browser to the latest version!"
	},
	dropzone_valid_drops:{
		id: "dropzone_valid_drops",
		description: "1 - ",
		defaultMessage: "Awesome! We found the location of your coast."
	},
	feature_dialog_ok_label:{
		id: "feature_dialog_ok_label",
		description: "0 - ",
		defaultMessage: "Close"
	},
	button_tooltip_upload_image:{
		id: "button_tooltip_upload_image",
		description: "0 - ",
		defaultMessage: "Upload"
	}
	

} );

class Upload extends Component {

	componentDidMount (){

		window.addEventListener( 'dragenter', ( e ) => {

			e = e || event;
			e.preventDefault();

			this.setState( { isWindowDrag: !this.state.blockDropzone } );

		}, false );

		window.addEventListener( 'dragleave', ( e ) => {

			e = e || event;
			e.preventDefault();

			this.setState( { isWindowDrag: false } );

		}, false );

		this._init();

	}

	componentWillUnmount (){

		// Cancel geoJsonRequest ?? 

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.geoJsonRequest;
		this.map;
		this.initZoom = 0;
		this.minZoom = 0;
		this.maxZoom = 22;
		this.initCenter = [ 150, 39 ];

		//https://gist.github.com/gre/1650294
		this.easeInOutQuad = function ( t ) {

			return t<.5 ? 2*t*t : -1+( 4-2*t )*t 

		};
		this.easeInOutQuint = function ( t ) {

			return t<.5 ? 16*t*t*t*t*t : 1+16*( --t ) *t*t*t*t;

		};

		this.easeOutQuint= function ( t ) { 

			return 1+( --t )*t*t*t*t;

		};

		this.easeInQuint= function ( t ) {

			return t*t*t*t*t;

		};

		this.state = {

			isWindowDrag: false,
			showFeatureDialog: false,
			showUploadDropDialog: false,
			featureToShow: undefined,
			dialogDrop: undefined,
			dropLayerId: undefined,
			blockDropzone: true,
			showMapLoader: false,
			uploadProgress: 0

		} 

	}

	render () {

		const { formatMessage/*, locale*/ } = this.props.intl;
		const { className } = this.props;
		const { isWindowDrag, showFeatureDialog, showUploadDropDialog, featureToShow, dialogDrop, blockDropzone, showMapLoader, uploadProgress } = this.state;

		const cls = Classnames( style.upload, className );
		const clsForm = Classnames( style.fill, {

			[ style.passEventsToMap ]: !isWindowDrag

		} );
		const clsMap = Classnames( style.fill, style.map );
		const clsUploadButton = Classnames ( style.uploadButton, {

			[ style.blockUploadButton ]: blockDropzone

		} );

		const fileValidations = [
			{
				methodName: "imageHasLocation",
				options: { required: true, passesWhen: true, abort: true },
				label: "Location",
				description: "Checking image for information on the location it was taken",
				success: "Awesome!! We found the location",
				error: "We can't extract the location from the metadata. (The next version of Coastwards will allow you to place the image manually. Sign up to be notified!)"
			}/*,
			{
				methodName: "imageWithFlash",
				options: { required: true, passesWhen: false, abort: false },
				label: "No flash",
				description: "Checking whether the image was taken with flash",
				success: "Great! No flash, that means it was probably taken with enough ambient light",
				error: "Flash was used to take this image"
			},
			{
				methodName: "imageHasColor",
				options: { color: "blue", required: true, passesWhen: true, abort: false },
				label: "Color blue",
				description: "Checking whether the image has the color blue (water)",
				success: "Great! There is blue in the image.",
				error: "We couldn't find the color blue"
			}*/
		]
		
		return (

			<div id="Upload" className={ cls }>
				{ showMapLoader && <ProgressBar type="linear" mode="indeterminate" className={ style.mapLoader } /> }
				<MapboxGL
					ref="map"
					className={ clsMap }
					unsupportedTitle={ formatMessage( messages.mapbox_warning_unsupported_title ) }
					unsupportedMessage={ formatMessage( messages.mapbox_warning_unsupported_message ) }
					/*language={ locale }*/
					zoom={ this.initZoom }
					minZoom={ this.minZoom }
					maxZoom={ this.maxZoom }
					center={ this.initCenter }
					maxBounds={ [ [ 360, 84 ], [ -360, -70 ] ] }
					attributionControl={ false }
					scrollZoom={ false}
					navigationControl={ true }
					navigationControlPosition="top-left"
					style="mapbox://styles/maureentsakiris/cinxhoec70043b4nmx0rkoc02"
					accessToken="pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpbXM1N2Z2MTAwNXF3ZW0ydXI3eXZyOTAifQ.ATjSaskEecYMiEG36I_viw"
				/>
				<FormTB name="upload" className={ clsForm } ref="form" onSubmitProgress={ this._onUploadProgress } onSubmitDone={ this._onUploadDone } onSubmitError={ this._onUploadError } >
					<DropzoneTB
						name="dropzone"
						ref="dropzone"
						className={ style.dropzone }
						multiple={ false }
						max={ 1 }
						warning_max={ formatMessage( messages.dropzone_warning_max ) }
						warning_accept={ formatMessage( messages.dropzone_warning_accept ) }
						required={ true }		
						fileValidations={ fileValidations }
						disabled={ blockDropzone }
						zoneProps={ {

							clsZone: style.zone,
							clsZoneEnter: style.zoneEnter,
							clsZoneBlocked: style.zoneBlocked,
							promptDrag: "",
							promptDrop: formatMessage( messages.dropzone_prompt_drop ),
							promptClick: ""

						} }
						onDropsAccepted={ this._onDropsAccepted }
						onInValidDrop={ this._onInValidDrop }
						onDropsValidated= { this._onDropsValidated }
					/>
				</FormTB>
				<TooltipButton tooltip={ formatMessage( messages.button_tooltip_upload_image ) } tooltipDelay={ 1000 } icon="file_upload" floating accent className={ clsUploadButton } onClick={ this._openInput } />
				<FeatureDialog label={ formatMessage( messages.feature_dialog_ok_label ) } onClick={ this._hideFeatureDialog } active={ showFeatureDialog } feature={ featureToShow } />
				<UploadDropDialog
					name="userinput"
					active={ showUploadDropDialog } 
					dialogDrop={ dialogDrop }
					onCancelClick={ this._cancelUpload }
					onUploadClick={ this._uploadForm }
					progress={ uploadProgress }
				/>
			</div>

		)

	}


	// INIT

	_promiseFetchGeojson = () => {

		let options = {

			path: '/contributions/geojson',
			json: true

		}

		this._showMapLoader( true );

		return new Promise( ( resolve, reject ) => {

			this.geoJsonRequest = http.get( options, ( res ) => {

				const body = [ ];

				res.on( 'data', ( chunk ) => { 

					body.push( chunk );

				} );

				res.on( 'end', ( ) => {

					resolve( body.join( '' ) );

				} );

			} ).on( 'error', ( e ) => {

				reject( e );

			} );

		} );

	}

	_promiseParseGeojson = ( res ) => {

		return new Promise( ( resolve, reject ) => {

			if( res.status == 'KO' ){

				reject( res.message );

			}else{

				let result = JSON.parse( res );
				let geojson = result.json;
				if( _.isEmpty( geojson ) ){

					reject( 'Be the first to upload a picture!!' );

				}else{

					resolve( geojson );

				}

			}

		} );

	}

	_promiseDisplayGeojson = ( geojson ) => {

		let markerSource = { 

			type: 'geojson',
			data: geojson,
			cluster: true,
			clusterMaxZoom: this.maxZoom,
			clusterRadius: 20

		}

		let markerLayer = {

			type: 'symbol',
			layout: {

				'icon-image': "{marker-symbol}"

			}

		}

		let geojsonLayer = {

			name: 'markers',
			source: markerSource,
			layer: markerLayer,
			position: 'country_label_1',
			onClick: this._showFeatureDialog

		}

		let clusterLayer = {

			sourcename: 'markers',
			position: 'country_label_1'/*,
			onClick: this._showFeatureDialog*/

		}

		return new Promise( ( resolve, reject ) => {

			this.refs.map._addLayer( geojsonLayer );
			this.refs.map._clusterLayer( clusterLayer );

			this._showMapLoader( false );

			if( !this.refs.map._getLayer( 'markers-circle' ) || !this.refs.map._getLayer( 'markers-count' ) ){

				reject( Error( 'Upload/_promiseDisplayGeojson/Failed to display geojson markers' ) );

			}else{

				resolve();

			}

		} );

	}

	_init = ( ) => {

		this.refs.map._promiseCreateMap().then( ( map ) => {

			this.map = map;
			// enableling upload does not depend on whether or not geojson is fetched and displayed ... only on whether the map has loaded
			this.setState( { blockDropzone: false } );
			return this._promiseFetchGeojson();

		} )
		.then( this._promiseParseGeojson )
		.then( this._promiseDisplayGeojson )
		.catch( ( error ) => {

			this._showMapLoader( false );
			this.context.logError( error );

		} );

	}


	// PRE DIALOG DROP EVENTS 

	_onDropsAccepted = ( ) => {

		this.setState( { blockDropzone: true } );

	}

	// As long as we only allow one image at a time we can show a dialog on invalid drop .. later on it should be a snackbar in the _onDropsValidated callback
	_onInValidDrop = ( status/*, inValidDrop*/ ) => {

		let message = status.imageHasLocation.message;

		const showInvalidDialog = ( message ) => {

			const { formatMessage } = this.props.intl;
			this.context.showDialog( { 

				title: formatMessage( messages.dropzone_drop_invalid_title ), 
				content: message,
				onOverlayClick: hideInvalidDialog,
				onEscKeyDown: hideInvalidDialog,
				actions: [ {

					label: 'OK',
					onClick: hideInvalidDialog

				} ] 

			} );

		}

		const hideInvalidDialog = ( ) => {

			this.setState( { blockDropzone: false }, this.context.hideDialog );

		}

		this.setState( { blockDropzone: true }, showInvalidDialog( message ) );

	}


	// ON DROPS VALIDATED

	_promiseValidDrop = ( validDrops ) => {

		return new Promise( ( resolve, reject ) => {
		
			const { formatMessage/*, locale*/ } = this.props.intl;

			if( validDrops.length ){

				this.context.showSnackbar( { label: formatMessage( messages.dropzone_valid_drops ) } );
				var validDrop = validDrops[ 0 ];
				resolve( validDrop );

			}else{

				reject( Error( 'Upload/_promiseValidDrop/Did not receive a valid drop' ) );

			}
			
		
		} );

	}

	_promiseDropMarker = ( validDrop ) => {

		return new Promise( ( resolve, reject ) => {
		
			let specs = validDrop.validations.imageHasLocation.result.specs;
			let id = Date.now().toString();


			// Add data to existing layer instead of creating a new one
			const geoJSON = {

				"type": "FeatureCollection",
				"features": [ {
					"type": "Feature",
					"geometry": {
						"type": "Point",
						"coordinates": [ specs.long, specs.lat ]
					},
					"properties": {
						"marker-symbol": "marker-accent",
						"comment": "Reload to see your comment",
						"image": validDrop.file.preview
					}

				} ]

			}

			const markerSource = { 

				type: 'geojson',
				data: geoJSON

			}

			const markerLayer = {

				type: 'symbol',
				layout: {

					'icon-image': "{marker-symbol}"

				}

			}

			let layer = {
				
				name: id,
				source: markerSource,
				layer: markerLayer,
				position: 'country_label_1',
				onClick: this._showFeatureDialog

			}

			this.refs.map._addLayer( layer );

			if( _.isObject( this.refs.map._getLayer( id ) ) ){

				validDrop.layerId = id;
				validDrop.specs = specs;
				resolve( validDrop );

			}else{

				reject( Error( 'Upload/_promiseDropMarker/Failed to drop marker' ) );

			}
		
		} );

	}

	_promiseGoFlying = ( validDrop ) => {

		// Flying to the spot is not absolutely necessary. Ensure that after 3 seconds the dialog appears no matter what

		return Promise.race( [

			new Promise( ( resolve ) => {

				setTimeout( ( ) => {

					resolve( validDrop );

				}, 5000 );

			} ),

			new Promise( ( resolve ) => {

				let zoom = _.max( [ this.map.getZoom(), 15 ] );
			
				this.map.flyTo( { 

					center: [ validDrop.specs.long, validDrop.specs.lat ], 
					zoom: zoom,
					duration: 5000,
					speed: 5, // make the flying slow
					curve: 1, // change the speed at which it zooms out
					easing: this.easeInOutQuint

				} );

				this.map.once( 'moveend', ( ) => {

					resolve( validDrop );

				} );
			
			} )

		] );

	}

	_promiseShowUploadDialog = ( validDrop ) => {

		this.setState( {

			dialogDrop: validDrop,
			showUploadDropDialog: true,
			dropLayerId: validDrop.layerId

		} );

		return true;

	}

	_onDropsValidated = ( validDrops/*, invalidDrops*/ ) => {


		this._promiseValidDrop( validDrops )
		.then( this._promiseDropMarker )
		.then( this._promiseGoFlying )
		.then( this._promiseShowUploadDialog )
		.catch( ( error ) => {

			this.context.logError( error );

		} );

	}


	// USER ACTION: CANCEL OR UPLOAD

	_cancelUpload = () => {

		this.refs.map._removeLayer( this.state.dropLayerId );
		this._resetUpload();

	}

	_uploadForm = ( ) => {

		this.refs.form._submit();

	}

	_onUploadProgress = ( e ) => {

		let progress = ( e.loaded / e.total ) * 100;

		this.setState( { 

			uploadProgress: progress

		} );

	}

	_onUploadError = ( e ) => {

		console.log( "UPLOAD ERROR", e );

	}

	_onUploadDone = ( response ) => {

		let res = JSON.parse( response );
		if( res.status == 'KO' ){

			console.log( "RESPONSE ERROR" );
			console.log( res );

		}else{

			console.log( "Show users what was uploaded" );

		}

		this._resetUpload();

	}


	// OTHER

	_showFeatureDialog = ( featureToShow ) => {

		this.setState( { featureToShow: featureToShow, showFeatureDialog: true, blockDropzone: true } );

	}

	_hideFeatureDialog = ( ) => {

		this.setState( { showFeatureDialog: false, featureToShow: undefined, blockDropzone: false } );

	}

	_openInput = ( ) => {

		this.refs.dropzone.refs.element._openInput();

	}

	_showMapLoader = ( bool ) => {

		this.setState( { showMapLoader: bool } );

	}

	_resetUpload = ( ) => {

		this.refs.map._zoomTo( 1, { 
			duration: 3000, 
			easing: this.easeInQuint 
		} );

		this.setState( {

			showUploadDropDialog: false,
			dropLayerId: undefined,
			blockDropzone: false,
			uploadProgress: 0

		}, this.refs.form._resetForm() );

	}

}  

Upload.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string

};

Upload.contextTypes = {

	showDialog: PropTypes.func,
	hideDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func,
	logError: PropTypes.func

};

export default injectIntl( Upload );
