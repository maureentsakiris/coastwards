import React, { Component, PropTypes } from 'react';
import Grid from '../utils/MDL/Grid';
import Cell from '../utils/MDL/Cell';
import Intro from './Intro';
import Info from './Info';


/*import Footer from './Footer';*/
/*import How from './How';
import Faqs from './Faqs';
import Team from './Team';
import Mooc from './Mooc';*/
import Upload from './Upload';
/*import Phase2 from './Phase2';*/


export default class App extends Component {

	static contextTypes = {

		draganddrop: PropTypes.bool

	}

	constructor ( props ) {

		super ( props );

	}

	render () {

		return (

			<div id="Content">
				
			</div>

		)

	}

}
 