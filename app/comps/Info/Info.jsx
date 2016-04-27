import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';

import Tabs from '../../utils/Tabs/Tabs';
import { Button } from 'react-toolbox/lib/button';

import style from './_styleInfo';

const messages = defineMessages( {

	upload_pictures:{
		id: "upload_pictures",
		description: "0 - ",
		defaultMessage: "upload_pictures"
	},
	how_does_a_picture_help:{
		id: "how_does_a_picture_help",
		description: "0 - Main menu",
		defaultMessage: "How does a picture help?"
	},
	just_any_picture:{
		id: "just_any_picture",
		description: "0 - Main menu",
		defaultMessage: "Just any picture?"
	},
	who_are_you:{
		id: "who_are_you",
		description: "0 - Main menu",
		defaultMessage: "Who are you?"
	},
	other_questions:{
		id: "other_questions",
		description: "0 - Main menu",
		defaultMessage: "other_questions"
	}

} );

class Info extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {


		}

	}

	render () {

		const { formatMessage } = this.props.intl;

		return (

			<div id="Info" className={ style.info }>
				<Tabs arrows={ true } style={ { alignItems: 'stretch' } } activeCls={ style.active } accent={ false } inverse={ true } >
					<div className={ style.upload }>
						<Button className={ style.tabButton } label={ formatMessage( messages.upload_pictures ) } flat inverse />
					</div>
					<div className={ style.how }>
						<Button className={ style.tabButton } label={ formatMessage( messages.how_does_a_picture_help ) } flat inverse />
					</div>
					<div className={ style.guidelines }>
						<Button className={ style.tabButton } label={ formatMessage( messages.just_any_picture ) } flat inverse />
					</div>
					<div className={ style.team }>
						<Button className={ style.tabButton } label={ formatMessage( messages.who_are_you ) } flat inverse />
					</div>
					<div className={ style.faqs }>
						<Button className={ style.tabButton } label={ formatMessage( messages.other_questions ) } flat inverse />
					</div>
				</Tabs>
			</div>

		)

	}

}

Info.propTypes = {

	intl: intlShape.isRequired

};

Info.defaultProps = {

	

};

Info.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Info );
