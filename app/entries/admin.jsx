import React from 'react';
import ReactDom from 'react-dom'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import admin from 'reducers-admin'

const store = createStore( admin, compose(

	applyMiddleware( thunk )

) )

import ADMIN from 'containers/admin/admin'

ReactDom.render( 

	<Provider store={ store } >
		<ADMIN />
	</Provider>, 
	document.getElementById( 'Body' ) 

); 