import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render( 

	<form action="/login/authenticate" method="post">
		<div>
			<label>Username:</label>
			<input type="text" name="username"/>
		</div>
		<div>
			<label>Password:</label>
			<input type="password" name="password"/>
		</div>
		<div>
			<input type="submit" value="Log In"/>
		</div>
	</form>, 
	document.getElementById( 'Body' ) 

); 