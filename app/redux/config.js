/* TO ADD A MATERIAL:
	1. ADD in config.js
	2. ADD translations in: popup.jsx and form.jsx

*/


const materials = ( state= [ 

	{ 
		label: 'Sand',
		value: 'sand',
		color: '#ffc655'
	}, 
	{
		label: 'Pebble',
		value: 'pebble',
		color: '#82BD89'
	}, 
	{ 
		label: 'Rock',
		value: 'rock',
		color: '#0F4A57'
	}, 
	{
		label: 'Mud',
		value: 'mud',
		color: '#f46e36'
	},
	{
		label: 'Ice',
		value: 'ice',
		color: '#24adbb'
	},
	{
		label: 'Man-made',
		value: 'manmade',
		color: '#ED4768'
	},
	{
		label: 'Not sure',
		value: 'notsure',
		color: '#cbd836'
	},
	{
		label: 'Not set',
		value: '',
		color: '#0058e6' 
	}

], action ) => {

	switch ( action.type ){

	default:
		return state;

	}

}

module.exports = materials