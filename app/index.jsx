import React from 'react';
import ReactDOM from 'react-dom';

import Context from './utils/Context/Context';
import I18n from './utils/i18n/i18n';
import App from './comps/App/App';

import style from './_styleIndex';

ReactDOM.render( 

	<Context className={ style.context }>
		<I18n defaultLocale="en" hotSwitch={ true } helpTranslateURL="/translate">
			<App />
		</I18n>
	</Context>, 
	document.getElementById( 'Body' ) 

); 