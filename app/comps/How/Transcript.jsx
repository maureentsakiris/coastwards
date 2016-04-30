import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import MapTo from '../../utils/MapTo/MapTo';
import TranscriptLine from './TranscriptLine';

export default class Transcript extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const transcript = [
			{ timecode: '00:00', transcript_key: 'transcript_00' },
			{ timecode: '00:20', transcript_key: 'transcript_00' },
			{ timecode: '00:43', transcript_key: 'transcript_00' }
		];

		const propsMapTo = {

			dataArray: transcript

		}

		return (

			<MapTo { ...this.props } { ...propsMapTo }>
				<TranscriptLine />
			</MapTo>

		)

	}

}
