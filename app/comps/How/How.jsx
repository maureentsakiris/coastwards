import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { /*defineMessages,*/ injectIntl, intlShape } from 'react-intl';
import Classnames from 'classnames';

import style from './_styleHow';

/*const messages = defineMessages( {

	how_headline:{
		id: "how_headline",
		description: "0 - ",
		defaultMessage: "How Does A Picture Help?"
	},
	show_transcript:{
		id: "show_transcript",
		description: "1 - ",
		defaultMessage: "Show transcript"
	}

} );*/

class How extends Component {

	constructor ( props ) {

		super ( props );
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind( this );

		this.state = {

		}

	}

	render () {

		/*const { formatMessage } = this.props.intl;*/
		const { className } = this.props;

		const cls = Classnames( style.how, className );

		return (

			<div id="How" className={ cls }>
				<div id="Video" className={ style.videoWrapper }>
					<iframe></iframe>
				</div>
				<h2>Explanatory Video</h2>
				<h3>(Sorry, we are working on it. But you can read the script!)</h3>

				<h4>Quick introduction to sea-level rise</h4>
				<p>Sea-levels rise because ice melts and our oceans absorb the excess heat and expand - a process that will take centuries to play out.</p>
				<p>Only, it doesn’t play out evenly.</p>
				<p>Sea-levels vary drastically from place to place and every coast responds differently depending on what it is made of and what we have made of it.</p>
				<p>Many submerge but some subside, and some even uplift!</p>
				<p>Some are at low risk and unpopulated while others are at high risk and overpopulated.</p>
				<p>So forget that bathtub image. It’s more complicated than that.</p>
				<h4>How does a picture help, then?</h4>
				<p>In a nutshell, they give science what satellites cannot: A close-up image of a coast. The possibility to study the bigger picture, in as much detail as possible.</p>
				<p>First, your images will be checked for information on the location they were taken, so we can place them on a map.</p>
				<p>Then, they will be analysed by scientists and citizen scientists (and maybe some day computers) to determine the coastal type at that location.</p>
				<p>The more images are analysed, the more detail is added to a global map of what types exists and where.</p>
				<p>This map is then fed into computer programs that help scientists make prediction on how different coasts respond under different circumstances.</p>
				<p>These predictions in return inform policy makers at national and international levels on which actions to take and which countries are in need of international help.</p>
				<p>Your images help science give their best advice on how to best protect ourselves, our children and our grandchildren from sea-level rise.</p>
				
				<h4>Together we can create this map.</h4>
				<h3>It’s easy.</h3>
				<h3>It’s beautiful.</h3>
				<h3>And it will make a difference.</h3>
			</div>

		)

	}

}

How.propTypes = {

	intl: intlShape.isRequired,
	className: PropTypes.string

};

How.contextTypes = {

	showDialog: PropTypes.func,
	showLoader: PropTypes.func,
	showSnackbar: PropTypes.func

};

export default injectIntl( How );
