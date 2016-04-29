import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import Tabs from '../../utils/Tabs/Tabs';
import { Button } from 'react-toolbox/lib/button';

import Upload from '../Upload/Upload';
import How from '../How/How';
import Guidelines from '../Guidelines/Guidelines';
import Team from '../Team/Team';
import FAQs from '../FAQs/FAQs';

import style from './_styleInfo'; 

const messages = defineMessages( {

	upload_pictures:{
		id: "upload_pictures",
		description: "0 - ",
		defaultMessage: "Upload pictures!"
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
		defaultMessage: "Other questions ..."
	}

} );

class Info extends Component {

	static propTypes = {

		onTabClick: PropTypes.func

	}

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {


		}

	}

	render () {

		const { formatMessage } = this.props.intl;
		const { onTabClick } = this.props;

		return (

			<div id="Info" className={ style.info }>
				<Tabs arrows={ true } style={ { alignItems: 'stretch' } } activeCls={ style.active } accent={ false } inverse={ true } >
					
					<Button className={ style.tabButton } label={ formatMessage( messages.upload_pictures ) } flat inverse onClick={ onTabClick.bind( this, Upload ) } />
					<Button className={ style.tabButton } label={ formatMessage( messages.how_does_a_picture_help ) } flat inverse onClick={ onTabClick.bind( this, How ) } />
					<Button className={ style.tabButton } label={ formatMessage( messages.just_any_picture ) } flat inverse onClick={ onTabClick.bind( this, Guidelines ) } />
					<Button className={ style.tabButton } label={ formatMessage( messages.who_are_you ) } flat inverse onClick={ onTabClick.bind( this, Team ) } />
					<Button className={ style.tabButton } label={ formatMessage( messages.other_questions ) } flat inverse onClick={ onTabClick.bind( this, FAQs ) } />
					
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
