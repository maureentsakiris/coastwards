/* TO ADD A MATERIAL:
	1. ADD in config.js
	2. ADD translations in: popup.jsx and form.jsx

*/

//cbd836
const materials = ( state= [ 

	{ 
		label: 'Sand',
		value: 'sand',
		color: '#ffc417'
	}, 
	{
		label: 'Pebble',
		value: 'pebble',
		color: '#6bcc59'
	}, 
	{ 
		label: 'Rock',
		value: 'rock',
		color: '#f46e36'
	}, 
	{
		label: 'Mud',
		value: 'mud',
		color: '#bed839'
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
		color: '#5f81b1'
	},
	{
		label: 'Not set',
		value: '',
		color: '#5f81b1' 
	}

], action ) => {

	switch ( action.type ){

	default:
		return state;

	}

}

module.exports = materials