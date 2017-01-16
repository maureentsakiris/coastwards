/* TO ADD A MATERIAL:
	1. ADD in config.js
	2. ADD translations in: popup.jsx and form.jsx

*/

//cbd836
const materials = ( state= [ 

	{ 
		label: 'Sand',
		value: 'sand',
		color: '#ffe34f'
	}, 
	{
		label: 'Pebble',
		value: 'pebble',
		color: '#7fbb74'
	}, 
	{ 
		label: 'Rock',
		value: 'rock',
		color: '#24adbb'
	}, 
	{
		label: 'Mud',
		value: 'mud',
		color: '#c7da65'
	},
	{
		label: 'Ice',
		value: 'ice',
		color: '#ED4768'
	},
	{
		label: 'Man-made',
		value: 'manmade',
		color: '#f46e36'
	},
	{
		label: 'Not sure',
		value: 'notsure',
		color: '#ccc'
	},
	{
		label: 'Not set',
		value: '',
		color: '#ccc' 
	}

], action ) => {

	switch ( action.type ){

	default:
		return state;

	}

}

module.exports = materials