import React from 'react';
import ReactDOM from 'react-dom';
import GlobalWrapper from './utils/GlobalWrapper';
import I18nWrapper from './utils/i18n/I18nWrapper';
import App from './comps/App';


require ( './utils/MDL/js/material.min.js' );
require ( './utils/MDL/css/material.min.css' );
require ( './utils/MDL/css/material-extend.scss' );
require ( './utils/MDL/css/material-icons.css' );
require ( './utils/Leaflet/css/leaflet.css' );
require ( './stylesheets/main.css' );


ReactDOM.render( 

	<GlobalWrapper>
		<I18nWrapper defaultLocale="en">
			<App />
		</I18nWrapper>
	</GlobalWrapper>, 
	document.getElementById( 'App' ) 

);