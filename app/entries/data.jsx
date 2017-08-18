import React from 'react';
import ReactDom from 'react-dom'

import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import data from 'reducers-data'

const store = createStore( data, compose(

	applyMiddleware( thunk )

) )

import DATA from 'containers/data/data'

ReactDom.render( 

	<Provider store={ store } >
		<DATA />
	</Provider>, 
	document.getElementById( 'Body' ) 

); 