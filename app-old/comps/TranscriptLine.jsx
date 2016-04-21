import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages( {

	transcript_00:{
		id: 'transcript_00',
		description: '0 - ',
		defaultMessage: 'transcript_00'
	}

} );

class TranscriptLine extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

	}

	render () {

		const { formatMessage } = this.props.intl;

		return (

			<div>
				<p>{ this.props.data.timecode }</p>
				<p>{ formatMessage( messages[ this.props.data.transcript_key ] ) }</p>
			</div>

		)

	}

}

TranscriptLine.propTypes = {

	intl: intlShape.isRequired,
	data: PropTypes.object.isRequired

};

export default injectIntl( TranscriptLine );
