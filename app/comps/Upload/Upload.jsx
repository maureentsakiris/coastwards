import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';
import _ from 'underscore';
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

			this.setState( { noEvents: false } );

		}, false );

		window.addEventListener( 'dragleave', ( e ) => {

			e = e || event;
			e.preventDefault();

			this.setState( { noEvents: true } );

		}, false );

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.map;
		this.initZoom = 0;
		this.minZoom = 0;
		this.maxZoom = 22;

		this.state = {

			noEvents: true,
			showDialog: false,
			feature: undefined,
			processing: false

		} 

	}

	render () {

		const { formatMessage/*, locale*/ } = this.props.intl;
		const { className } = this.props;
		const { noEvents, showDialog, feature, processing } = this.state;

		const cls = Classnames( style.upload, className );
		const clsForm = Classnames( style.fill, {

			[ style.noEvents ]: noEvents 

		} );
		const clsMap = Classnames( style.fill, style.map );
		const clsUploadButton = Classnames ( style.uploadButton );

		const fileValidations = [
			{
				methodName: "imageHasLocation",
				options: { required: true, passesWhen: true, abort: true },
				label: "Location",
				description: "Checking image for information on the location it was taken",
				success: "Yay! We know where that coast is",
				error: "We can't extract the location from the metadata. (The next version of coastwards will allow you to place the image manually, so stay tuned!)"
			},
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
			}
		]

		const geoJSON = {

			"type": "FeatureCollection",
			"features": [ {
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": [ -77.03238901390978, 38.913188059745586 ]
				},
				"properties": {
					"marker-symbol": "marker",
					"comment": "I used to go to this beach as a child. Since then it has changed so much.",
					"image": "./uploads/01.jpg"
				}
			}, {
				"type": "Feature",
				"geometry": {
					"type": "Point",
					"coordinates": [ -122.414, 37.776 ]
				},
				"properties": {
					"marker-symbol": "marker",
					"comment": "I used to go to this beach as a child. Since then it has changed so much.",
					"image": "./uploads/05.jpg"
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

				'icon-image': "{marker-symbol}-11"

			}

		}

		
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
					style="mapbox://styles/maureentsakiris/cinxhoec70043b4nmx0rkoc02"
					accessToken="pk.eyJ1IjoibWF1cmVlbnRzYWtpcmlzIiwiYSI6ImNpbXM1N2Z2MTAwNXF3ZW0ydXI3eXZyOTAifQ.ATjSaskEecYMiEG36I_viw"
					layers={ [

						{
							name: 'markers',
							source: markerSource,
							layer: markerLayer,
							position: 'place_label_other',
							onClick: this._showDialog

						}

					] }
				/>
				<FormTB name="upload" className={ clsForm } ref="form" autoSubmit={ false } onReset={ this._onFormReset }>
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
						disabled={ false }
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
				<TooltipButton tooltip={ formatMessage( messages.button_upload_image ) } tooltipDelay={ 1000 } icon="file_upload" floating accent disabled={ processing } className={ clsUploadButton } onClick={ this._openInput } />
				<FeatureDialog label={ formatMessage( messages.mapbox_dialog_action_label ) } onClick={ this._hideDialog } active={ showDialog } feature={ feature } />
			</div>

		)

	}

	_onFormReset = () => {

		this.setState( { processing: false } );

	}

	_onDropsAccepted = ( ) => {

		this.setState( { processing: true } );

	}

	_onInValidDrop = ( status, inValidDrop ) => {

		const { formatMessage } = this.props.intl;

		let prettyStatus = '';

		_.each( status, ( stat, index ) => {

			prettyStatus += stat.message;

		} );


		this.context.showDialog( { title: formatMessage( messages.dropzone_drop_invalid_title ), content: prettyStatus } );

	}

	_onValidDrop = ( status, validDrop ) => {

		console.log( validDrop );
		this._goFlying( validDrop.props.file );

	}

	_goFlying = ( validDrop ) => {

		let specs = validDrop.imageHasLocation.result.specs;
		this.map.flyTo( { 

			center: [ specs.long, specs.lat ], 
			zoom: 8,
			speed: 0.8, // make the flying slow
			curve: 1, // change the speed at which it zooms out
			easing: function ( t ) {

				return t<.5 ? 2*t*t : -1+( 4-2*t )*t;

			}

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
					"marker-symbol": "marker",
					"comment": "",
					"image": validDrop.preview
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

				'icon-image': "{marker-symbol}-11"

			}

		}

		let layer = {
			
			name: id.toString(),
			source: markerSource,
			layer: markerLayer,
			position: 'place_label_other',
			onClick: this._showDialog

		}

		this.refs.map._addLayer( layer );

	}

	_onDropsValidated = ( validDrops ) => {

		if( !validDrops.length ){

			this._resetUploadButton();

		}

	}

	_resetUploadButton = ( ) => {

		this.setState( { processing: false } );

	}

	_initMap = ( e ) => {

		this.map = e;

	}

	_showDialog = ( feature ) => {

		this.setState( { feature: feature, showDialog: true } );

	}

	_hideDialog = ( ) => {

		this.setState( { showDialog: false } );

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
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Upload );
