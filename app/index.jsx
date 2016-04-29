import React from 'react';
import ReactDOM from 'react-dom';
import Context from './utils/Context/Context';
import I18n from './utils/i18n/I18n';
import App from './comps/App/App';

import './_styleIndex';

ReactDOM.render( 

	<Context>
		<I18n defaultLocale="en">
			<App />
		</I18n>
	</Context>, 
	document.getElementById( 'Body' ) 

); 