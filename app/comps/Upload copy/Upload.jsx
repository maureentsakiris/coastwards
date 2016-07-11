import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';
import _ from 'underscore';
import Modernizr from 'modernizr';

import { Button } from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';
import ProgressBar from 'react-toolbox/lib/progress_bar';
const TooltipButton = Tooltip( Button );

import style from './_styleUpload';

import FormTB from '../../utils/FormTB/FormTB/FormTB';
import DropzoneTB from '../../utils/FormTB/DropzoneTB/DropzoneTB';
import MapboxGL from '../../utils/MapboxGL/MapboxGL';
import request from '../../utils/Request';

import FeatureSheet from './FeatureSheet';
import DropSheet from './DropSheet';
import Screen from './Screen'; 


const messages = defineMessages( {

	teaser_drag_l1:{
		id: "teaser_drag_2",
		description: "0 - ",
		defaultMessage: "Drag & drop your image onto the map"
	},
	teaser_drag_l2:{
		id: "teaser_drag_l2",
		description: "0 - ",
		defaultMessage: "(or click the big red button)"
	},
	teaser_click:{
		id: "teaser_click",
		description: "0 - ",
		defaultMessage: "Click the big red button to upload an image"
	},
	teaser_gotit:{
		id: "teaser_gotit",
		description: "0 - ",
		defaultMessage: "Got it!"
	},
	dropzone_prompt_drop:{
		id: "dropzone_prompt_drop",
		description: "0 - ",
		defaultMessage: "And now drop!"
	},
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
		defaultMessage: "Too bad! Your image didn't pass the tests :/" 
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
		defaultMessage: "Awesome! Here we go!"
	},
	button_tooltip_upload_image:{
		id: "button_tooltip_upload_image",
		description: "0 - ",
		defaultMessage: "Upload"
	},
	file_validation_imageHasLocation_label:{
		id: "file_validation_imageHasLocation_label",
		description: "0 - ",
		defaultMessage: "Location"
	},
	file_validation_imageHasLocation_description:{
		id: "file_validation_imageHasLocation_description",
		description: "0 - ",
		defaultMessage: "Checking if the location of the coast is embedded in the picture"
	},
	file_validation_imageHasLocation_success:{
		id: "file_validation_imageHasLocation_success",
		description: "0 - ",
		defaultMessage: "Awesome!! We found the location"
	},
	file_validation_imageHasLocation_error:{
		id: "file_validation_imageHasLocation_error",
		description: "0 - ",
		defaultMessage: "We couldn't find the location in the metadata. If you are on-site, please active location services on your mobile or digital camera and re-take the picture."
	},
	file_validation_imageMinimumDimensions_label:{
		id: "file_validation_imageMinimumDimensions_label",
		description: "0 - ",
		defaultMessage: "Image size"
	},
	file_validation_imageMinimumDimensions_description:{
		id: "file_validation_imageMinimumDimensions_description",
		description: "0 - ",
		defaultMessage: "Checking if image is big enough"
	},
	file_validation_imageMinimumDimensions_success:{
		id: "file_validation_imageMinimumDimensions_success",
		description: "0 - ",
		defaultMessage: "Image is big enough"
	},
	file_validation_imageMinimumDimensions_error:{
		id: "file_validation_imageMinimumDimensions_error",
		description: "0 - ",
		defaultMessage: "Image should be bigger than 800 x 800 pixels at 72dpi"
	},
	screen_uploading:{
		id: "screen_uploading",
		description: "0 - ",
		defaultMessage: "Uploading"
	},
	screen_updating_database:{
		id: "screen_updating_database",
		description: "0 - ",
		defaultMessage: "Updating database"
	},
	screen_upload_success:{
		id: "screen_upload_success",
		description: "0 - ",
		defaultMessage: "THANK YOU!!!"
	},
	screen_upload_error:{
		id: "screen_upload_error",
		description: " - ",
		defaultMessage: "Oh crap .. something went wrong. Please try again."
	},
	screen_upload_error_action_label:{
		id: "screen_upload_error_action_label",
		description: "0 - ",
		defaultMessage: "Ok"
	}
	

} );

class Upload extends Component {

	componentWillMount (){

		const { formatMessage } = this.props.intl;
		let l1 = Modernizr.draganddrop ? formatMessage( messages.teaser_drag_l1 ) : formatMessage( messages.teaser_click );
		let l2 = Modernizr.draganddrop ? formatMessage( messages.teaser_drag_l2 ) : '';

		let options = {

			message: [ l1, l2 ],
			label: formatMessage( messages.teaser_gotit ),
			onClick: this._resetScreen,
			active: true,
			showLoader: false

		}

		this.setState( { screenOptions: options } );

	}

	componentDidMount (){

		window.addEventListener( 'dragenter', ( e ) => {

			e = e || event;
			e.preventDefault();

			this._resetScreen();
			this.setState( { isWindowDrag: !this.state.blockDropzone } );

		}, false );

		window.addEventListener( 'dragleave', ( e ) => {

			e = e || event;
			e.preventDefault();

			this.setState( { isWindowDrag: false } );

		}, false );

		this._init();

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

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
			showFeatureSheet: false,
			showDropSheet: false,
			featureToShow: undefined,
			dropToUpload: undefined,
			dropLayerId: undefined,
			blockDropzone: true,
			showMapLoader: false,
			screenOptions: {}/*,
			moveMapOver: false*/

		} 

	}

	render () {

		const { formatMessage/*, locale*/ } = this.props.intl;
		const { className } = this.props;
		const { isWindowDrag, showFeatureSheet, showDropSheet, featureToShow, dropToUpload, blockDropzone, showMapLoader, screenOptions/*, moveMapOver*/ } = this.state;

		const cls = Classnames( style.upload, className );
		const clsForm = Classnames( style.fill, {

			[ style.passEventsToMap ]: !isWindowDrag/*,
			[ style.blockForm ]: showFeatureSheet*/

		} );
		const clsMap = Classnames( style.fill, style.map, {

			/*[ style.moveMapOver ]: moveMapOver*/ 

		} );

		const clsUploadButton = Classnames ( style.uploadButton, {

			[ style.blockUploadButton ]: blockDropzone

		} );

		const fileValidations = [
			{
				methodName: "imageHasLocation",
				options: { required: true, passesWhen: true, abort: false },
				label: formatMessage( messages.file_validation_imageHasLocation_label ),
				description: formatMessage( messages.file_validation_imageHasLocation_description ),
				success: formatMessage( messages.file_validation_imageHasLocation_success ),
				error: formatMessage( messages.file_validation_imageHasLocation_error )
			},
			{
				methodName: "imageMinimumDimensions",
				options: { minimumDimensions: [ 800, 800 ], required: true, passenWhen: true, abort: false },
				label: formatMessage( messages.file_validation_imageMinimumDimensions_label ),
				description: formatMessage( messages.file_validation_imageMinimumDimensions_description ),
				success: formatMessage( messages.file_validation_imageMinimumDimensions_success ),
				error: formatMessage( messages.file_validation_imageMinimumDimensions_error )
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
				<div id="WrapMap" className={ clsMap }>
					<MapboxGL
					ref="map"
					unsupportedTitle={ formatMessage( messages.mapbox_warning_unsupported_title ) }
					unsupportedMessage={ formatMessage( messages.mapbox_warning_unsupported_message ) }
					/*language={ locale }*/
					zoom={ this.initZoom }
					minZoom={ this.minZoom }
					maxZoom={ this.maxZoom }
					center={ this.initCenter }
					maxBounds={ [ [ 360, 84 ], [ -360, -70 ] ] }
					attributionControl={ false }
					scrollZoom={ true }
					dragRotate={ false }
					navigationControl={ true }
					navigationControlPosition="top-left"
					style="mapbox://styles/maureentsakiris/cinxhoec70043b4nmx0rkoc02"
					accessToken="pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpbXM1N2Z2MTAwNXF3ZW0ydXI3eXZyOTAifQ.ATjSaskEecYMiEG36I_viw"
					/>
				</div>
				<FormTB 
					name="upload" 
					className={ clsForm } 
					ref="form" 
					onSubmitProgress={ this._onUploadProgress } 
					onSubmitDone={ this._onUploadDone } 
					onSubmitError={ this._onUploadError } 
				>
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
				<Screen 
					className={ style.fill }
					message={ screenOptions.message }
					label={ screenOptions.label }
					onClick={ screenOptions.onClick }
					active={ screenOptions.active }
					showLoader={ screenOptions.showLoader }
					progress={ screenOptions.progress }
				/>
				<TooltipButton 
					tooltip={ formatMessage( messages.button_tooltip_upload_image ) } 
					tooltipDelay={ 1000 } 
					icon="file_upload" 
					floating 
					accent 
					className={ clsUploadButton } 
					onClick={ this._openInput } 
				/>
				<FeatureSheet 
					id="Featuresheet"
					active={ showFeatureSheet }
					onOverlayClick={ this._hideFeatureSheet } 
					onEscKeyDown={ this._hideFeatureSheet }  
					feature={ featureToShow } 
				/>
				<DropSheet
					id="Dropsheet"
					active={ showDropSheet } 
					drop={ dropToUpload }
					onEscKeyDown={ this._cancelUpload }
					onOverlayClick={ this._cancelUpload }
					onCancelClick={ this._cancelUpload }
					onUploadClick={ this._uploadForm }
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

		return request.promiseHTTPget( options );

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
			onClick: this._showFeatureSheet

		}

		let clusterLayer = {

			sourcename: 'markers',
			position: 'country_label_1'/*,
			onClick: this._showFeatureSheet*/

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

		let message = this._composeInValidDropStatus( status );

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

	_composeInValidDropStatus = ( status ) => {

		return _.map( status, ( status, index ) => {

			let clsIcon = Classnames( "material-icons", {

				[ style.passed ]: status.passed,
				[ style.error ]: !status.passed

			} );

			let result = status.passed ? <i className={ clsIcon }>check</i> : <i className={ clsIcon }>close</i>;

			return (

				<span key={ index } className={ style.status }>
					<span className={ style.row }><span className={ style.label }>{ status.label }:</span> { result }</span>
					<span className={ style.row }>{ status.message }</span>
					<br/>
				</span>

			)

		} );

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
				onClick: this._showFeatureSheet

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

		return new Promise( ( resolve ) => {

			this.setState( {

				dropToUpload: validDrop,
				showDropSheet: true,
				dropLayerId: validDrop.layerId

			}, resolve( validDrop ) );

		} );

	}

	/*_promiseCenterMap = ( validDrop ) => {

		return new Promise( ( resolve ) => {

			const recenter = () => {

				this.map.resize();
				//this.map.panTo( [ validDrop.specs.long, validDrop.specs.lat ] );
				resolve( validDrop );

			}

			setTimeout( recenter, 300 );

		} );

	}*/

	_onDropsValidated = ( validDrops/*, invalidDrops*/ ) => {


		this._promiseValidDrop( validDrops )
		.then( this._promiseDropMarker )
		.then( this._promiseGoFlying )
		.then( this._promiseShowUploadDialog )
		//.then( this._promiseCenterMap )
		.catch( ( error ) => {

			this.context.logError( error );

		} );

	}


	// USER ACTION: CANCEL OR UPLOAD

	_cancelUpload = () => {

		this._hideDropSheet();

		this._removeLayer( this.state.dropLayerId );
		this._resetUpload();
		this._flyOut();

	}

	_uploadForm = ( ) => {

		this.refs.form._submit();
		this._hideDropSheet();

	}


	// FORM UPLOAD EVENTS

	_onUploadError = ( ) => {

		this._showUploadError();

	}

	_onUploadProgress = ( e ) => {

		let progress = ( e.loaded / e.total ) * 100;

		let options = {

			message: '',
			label: '',
			active: true,
			showLoader: true,
			progress: progress

		}

		this.setState( { screenOptions: options } );

	}


	// FORM UPLOAD DONE

	_promiseResponseOK = ( response, model ) => {

		return new Promise( ( resolve, reject ) => {

			let res = JSON.parse( response );

			if( res.status == 'KO' ){

				reject( Error( 'Upload/_promiseResponseOK/Response status: KO' ) );

			}else{

				resolve( model );

			}

		} );

	}


	_promiseUploadedMarker = ( model ) => {

		let uploaded = model.dropzone[ 0 ];

		return new Promise( ( resolve, reject ) => {
		
			this._removeLayer( this.state.dropLayerId );

			let specs = uploaded.validations.imageHasLocation.result.specs;
			let id = Date.now().toString();


			let datetimeArr = uploaded.exifDateTime.split( ' ' );
			let date = datetimeArr[ 0 ].replace( /:/g, '-' );
			let datetime = date + ' ' + datetimeArr[ 1 ];

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
						"comment": uploaded.comment || "",
						"material": uploaded.material || "",
						"datetime": datetime || "",
						"verified": "0",
						"image": uploaded.file.preview
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
				onClick: this._showFeatureSheet

			}

			this.refs.map._addLayer( layer );

			if( _.isObject( this.refs.map._getLayer( id ) ) ){

				uploaded.layerId = id;
				uploaded.specs = specs;
				resolve( uploaded );

			}else{

				reject( Error( 'Upload/_promiseDropMarker/Failed to drop marker' ) );

			}
		
		} );

	}

	_promiseThankYou = ( uploaded ) => {

		const { formatMessage } = this.props.intl;
		let options = {

			message: formatMessage( messages.screen_upload_success ),
			label: '',
			active: true,
			showLoader: false

		}
		this.setState( { screenOptions: options } );

		this._resetUpload();
		this._flyOut();
		setTimeout( this._resetScreen, 2000 );

		return uploaded;

	}


	_onUploadDone = ( response, model ) => {

		this._promiseResponseOK( response, model )
		.then( this._promiseUploadedMarker )
		.then( this._promiseThankYou )
		.catch( ( error ) => {

			this.context.logError( error );

			this._showUploadError();

			this._removeLayer( this.state.dropLayerId );
			this._resetUpload();
			this._flyOut();


		} );

	}


	// OTHER

	_showFeatureSheet = ( featureToShow ) => {

		//let { featureToShow } = this.state;
		//this.map.panTo( featureToShow.geometry.coordinates );

		this.setState( { 

			featureToShow: featureToShow, 
			showFeatureSheet: true, 
			blockDropzone: true/*,
			moveMapOver: true*/

		} );

		//setTimeout( this._moveMapOver, 300 );

	}

	/*_moveMapOver = ( ) => {

		this.setState( { moveMapOver: true } );
		this.map.resize();

		let { featureToShow } = this.state;
		//this.map.panTo( featureToShow.geometry.coordinates );

	}*/

	/*_moveMapBack = ( ) => {

		this.map.resize();

	}*/


	_hideFeatureSheet = ( ) => {

		this.setState( { 

			showFeatureSheet: false, 
			blockDropzone: false/*,
			moveMapOver: false */

		} );

	}

	_openInput = ( ) => {

		this._resetScreen();
		this.refs.dropzone.refs.element._openInput();

	}

	_showMapLoader = ( bool ) => {

		this.setState( { showMapLoader: bool } );

	}

	_resetUpload = ( ) => {

		this.setState( {

			dropLayerId: undefined,
			blockDropzone: false

		}, this.refs.form._resetForm() );

	}

	_hideDropSheet = ( ) => {

		this.setState( { showDropSheet: false } );

	}

	_removeLayer = ( id ) => {

		this.refs.map._removeLayer( id );

	}

	_flyOut = ( ) => {

		this.refs.map._zoomTo( 1, { 
			duration: 3000, 
			easing: this.easeInQuint 
		} );

	}

	_resetScreen = ( ) => {

		this.setState( { 

			screenOptions: {

				message: '',
				label: '',
				onClick: () => {},
				active: false,
				showLoader: false

			} 

		} );

	}

	_showUploadError = ( ) => {

		const { formatMessage } = this.props.intl;
		let options = {

			message: formatMessage( messages.screen_upload_error ),
			active: true,
			label: formatMessage( messages.screen_upload_error_action_label ),
			onClick: this._resetScreen,
			showLoader: false

		}
		this.setState( { screenOptions: options } );

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
