/* TO ADD A MATERIAL:
	1. ADD in config.js
	2. ADD translations in: popup.jsx and form.jsx

*/


const materials = ( state= [ 

	{ 
		label: 'Sand',
		value: 'sand',
		color: '#ffc162'
	}, 
	{
		label: 'Pebble',
		value: 'pebble',
		color: '#469a16'
	}, 
	{ 
		label: 'Rock',
		value: 'rock',
		color: '#7e3096'
	}, 
	{
		label: 'Mud',
		value: 'mud',
		color: '#8a5707'
	},
	{
		label: 'Ice',
		value: 'ice',
		color: '#ef25db'
	},
	{
		label: 'Man-made',
		value: 'manmade',
		color: '#000'
	},
	{
		label: 'Not sure',
		value: 'notsure',
		color: '#ccc'
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