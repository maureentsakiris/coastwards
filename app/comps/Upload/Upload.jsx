import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';
import _ from 'underscore';
import http from 'http';
import { Button } from 'react-toolbox/lib/button';
import Tooltip from 'react-toolbox/lib/tooltip';
const TooltipButton = Tooltip( Button );

import style from './_styleUpload';

import FormTB from '../../utils/FormTB/FormTB/FormTB';
import DropzoneTB from '../../utils/FormTB/DropzoneTB/DropzoneTB';
/*import SubmitTB from '../../utils/FormTB/SubmitTB/SubmitTB';*/
import MapboxGL from '../../utils/MapboxGL/MapboxGL';
import FeatureDialog from './FeatureDialog';

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
	dropzone_prompt_blocked:{
		id: "dropzone_prompt_blocked",
		description: "0 - ",
		defaultMessage: "Processing ... please wait until finished to drop more images"
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
	mapbox_dialog_action_label:{
		id: "mapbox_dialog_action_label",
		description: "0 - ",
		defaultMessage: "Close"
	},
	button_upload_image:{
		id: "button_upload_image",
		description: "0 - ",
		defaultMessage: "Upload an image"
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

		this.state = {

			isWindowDrag: false,
			showFeatureDialog: false,
			feature: undefined,
			blockDropzone: true

		} 

	}

	render () {

		const { formatMessage/*, locale*/ } = this.props.intl;
		const { className } = this.props;
		const { isWindowDrag, showFeatureDialog, feature, blockDropzone } = this.state;

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
				<MapboxGL
					ref="map"
					returnMap={ this._initMap }
					className={ clsMap }
					unsupportedTitle={ formatMessage( messages.mapbox_warning_unsupported_title ) }
					unsupportedMessage={ formatMessage( messages.mapbox_warning_unsupported_message ) }
					/*language={ locale }*/
					zoom={ this.initZoom }
					minZoom={ this.minZoom }
					maxZoom={ this.maxZoom }
					center={ [ 150, 39 ] }
					maxBounds={ [ [ 360, 84 ], [ -360, -70 ] ] }
					attributionControl={ false }
					scrollZoom={ false}
					navigationControl={ true }
					navigationControlPosition="top-left"
					style="mapbox://styles/maureentsakiris/cinxhoec70043b4nmx0rkoc02"
					accessToken="pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpbXM1N2Z2MTAwNXF3ZW0ydXI3eXZyOTAifQ.ATjSaskEecYMiEG36I_viw"
				/>
				<FormTB name="upload" className={ clsForm } ref="form" autoSubmit={ true } onReset={ this._onFormReset }>
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
						onValidDrop={ this._onValidDrop }
						onInValidDrop={ this._onInValidDrop }
						onDropsValidated= { this._onDropsValidated }
					/>
				</FormTB>
				<TooltipButton tooltip={ formatMessage( messages.button_upload_image ) } tooltipDelay={ 1000 } icon="file_upload" floating accent className={ clsUploadButton } onClick={ this._openInput } />
				<FeatureDialog label={ formatMessage( messages.mapbox_dialog_action_label ) } onClick={ this._hideFeatureDialog } active={ showFeatureDialog } feature={ feature } />
			</div>

		)

	}

	_fetchGeojson = () => {

		let options = {

			path: '/contributions/geojson',
			json: true

		}

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

	_onFormReset = () => {

		this.setState( { blockDropzone: false } );

	}

	_onDropsAccepted = ( ) => {

		this.setState( { blockDropzone: true } );

	}

	_onInValidDrop = ( status/*, inValidDrop*/ ) => {

		let message = status.imageHasLocation.message;
		this.setState( { blockDropzone: true }, this._showInvalidDialog( message ) );

	}

	_showInvalidDialog = ( message ) => {

		const { formatMessage } = this.props.intl;
		this.context.showDialog( { 

			title: formatMessage( messages.dropzone_drop_invalid_title ), 
			content: message,
			onOverlayClick: this._hideInvalidDialog,
			onEscKeyDown: this._hideInvalidDialog,
			actions: [ {

				label: 'OK',
				onClick: this._hideInvalidDialog

			} ] 

		} );

	}

	_hideInvalidDialog = ( ) => {

		this.setState( { blockDropzone: false }, this.context.hideDialog );

	}

	_onValidDrop = ( status, validDrop ) => {

		this.context.showSnackbar( { label: status.imageHasLocation.message } );
		this._goFlying( validDrop );

	}

	_goFlying = ( validDrop ) => {

		let specs = validDrop.state.validations.imageHasLocation.result.specs;
		let zoom = _.max( [ this.map.getZoom(), 3 ] );
		this.map.flyTo( { 

			center: [ specs.long, specs.lat ], 
			zoom: zoom,
			speed: 0.5, // make the flying slow
			curve: 1, // change the speed at which it zooms out
			easing: function ( t ) {

				return t<.5 ? 2*t*t : -1+( 4-2*t )*t;

			}

		} );

		this.map.once( 'moveend', function ( e ) {

			console.log( 'finished flying', e );

		} );

		let id = Date.now();

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
					"comment": "",
					"image": validDrop.props.file.preview
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
			
			name: id.toString(),
			source: markerSource,
			layer: markerLayer,
			position: 'country_label_1',
			onClick: this._showFeatureDialog

		}

		this.refs.map._addLayer( layer );

	}

	_onDropsValidated = ( validDrops ) => {

		if( !validDrops.length ){

			//this._resetUploadButton();

		}

	}

	_resetUploadButton = ( ) => {

		this.setState( { blockDropzone: false } );

	}

	_initMap = ( e ) => {

		this.map = e;

		this._fetchGeojson().then( function ( res ){

			if( res.status == 'KO' ){

				throw Error( res.message );

			}

			let result = JSON.parse( res );
			let geojson = result.json;

			return geojson;

		} ).then( ( geojson ) => {

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

			this.refs.map._addLayer( geojsonLayer );
			this.refs.map._clusterLayer( 'markers', 'country_label_1' );
			return true;
			

		} ).catch( ( error ) => {

			console.log( error );
			this.context.logError( error );

		} );

		this.setState( { blockDropzone: false } );

	}

	_showFeatureDialog = ( feature ) => {

		this.setState( { feature: feature, showFeatureDialog: true, blockDropzone: true } );

	}

	_hideFeatureDialog = ( ) => {

		this.setState( { showFeatureDialog: false, blockDropzone: false } );

	}

	_openInput = ( ) => {

		this.refs.dropzone.refs.element._openInput();

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
