import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';

import style from './_styleGuidelines';

const messages = defineMessages( {

	guidelines_header:{
		id: "guidelines_header",
		description: "1 - ",
		defaultMessage: "No."
	},
	guidelines_tagline:{
		id: "guidelines_tagline",
		description: "1 - ",
		defaultMessage: "This is science .. you want us to be picky."
	},
	guidelines_intro:{
		id: "guidelines_intro",
		description: "1 - ",
		defaultMessage: "Our goal is create a global map of coastal types. So yes, any coast but not any picture. The following guidelines will give you a general idea of what kind of pictures we need to achieve this."
	},
	gl_01_title:{
		id: "gl_01_title",
		description: "1 - ",
		defaultMessage: "01/ We need the location the picture was taken"
	},
	gl_01:{
		id: "gl_01",
		description: " - ",
		defaultMessage: "There is no need in determining the coastal type if we can't place the picture on a map. Smartphones and modern digital cameras usually save the location of the picture in the metadata which we can then extract. At the moment, only pictures that have their location embeded can be uploaded but for the Beta version, we plan to let you determine its location if you remember."
	},
	gl_02_title:{
		id: "gl_02_title",
		description: "1 - ",
		defaultMessage: "02/ We love you but we need to see the coast, not your face and not your thumb."
	},
	gl_02:{
		id: "gl_02",
		description: " - ",
		defaultMessage: "Also for privacy concerns, we will have to discard pictures that show faces. In the future, we hope to detect and blur faces out automatically, but until then we kindly ask you to make sure nobody can be recognized in your pictures."
	},
	gl_03_title:{
		id: "gl_03_title",
		description: "1 - ",
		defaultMessage: "03/ Not too much water, not too much coast"
	},
	gl_03:{
		id: "gl_03",
		description: " - ",
		defaultMessage: "Ideally, the picture was taken at the shoreline with the camera pointing alongside the coast, so the coast divides the picture in two. But we don't want anyone falling off cliffs either ..."
	},
	gl_04_title:{
		id: "gl_04_title",
		description: "1 - ",
		defaultMessage: "04/ Coasts are not only beaches"
	},
	gl_04:{
		id: "gl_04",
		description: " - ",
		defaultMessage: "No kidding. Still, the word makes many of us think of beaches but we also need pictures of promenades, cliffs ... anything that borders the oceans."
	}
	
	

} );

class Guidelines extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		const { formatMessage } = this.props.intl;
		const { className } = this.props;

		const cls = Classnames( style.guidelines, className );

		return (

			<div id="Guidelines" className={ cls }>
				<h2>{ formatMessage( messages.guidelines_header ) }</h2>
				<h3>{ formatMessage( messages.guidelines_tagline ) }</h3>
				<p>{ formatMessage( messages.guidelines_intro ) }</p>

				<h4>{ formatMessage( messages.gl_01_title ) }</h4>
				<p>{ formatMessage( messages.gl_01 ) }</p>

				<h4>{ formatMessage( messages.gl_02_title ) }</h4>
				<p>{ formatMessage( messages.gl_02 ) }</p>

				<h4>{ formatMessage( messages.gl_03_title ) }</h4>
				<p>{ formatMessage( messages.gl_03 ) }</p>

				<h4>{ formatMessage( messages.gl_04_title ) }</h4>
				<p>{ formatMessage( messages.gl_04 ) }</p>
			</div>

		)

	}

}

Guidelines.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string

};

Guidelines.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( Guidelines );
