/* TO ADD A MATERIAL:
	1. ADD in config.js
	2. ADD translations in: popup.jsx and form.jsx

*/

const materials = ( state= [ 

	{ 
		label: 'Sand',
		value: 'sand',
		color: '#ffc417'
	}, 
	{
		label: 'Pebble',
		value: 'pebble',
		color: '#bed839'
	}, 
	{ 
		label: 'Rock',
		value: 'rock',
		color: '#f46e36'
	}, 
	{
		label: 'Mud',
		value: 'mud',
		color: '#bb80ef'
	},
	{
		label: 'Ice',
		value: 'ice',
		color: '#ff99ad'
	},
	{
		label: 'Man-made',
		value: 'manmade',
		color: '#24adbb'
	},
	{
		label: 'Not sure',
		value: 'notsure',
		color: '#a9a9a9'
	},
	{
		label: 'Not close enough',
		value: 'notclose',
		color: '#a9a9a9'
	},
	{
		label: 'Not set',
		value: 'notset',
		color: '#0076b7' 
	}

], action ) => {

	switch ( action.type ){

	default:
		return state;

	}

}

module.exports = materials