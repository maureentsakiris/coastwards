require( 'dotenv' ).config();
var envName = process.env.NODE_ENV || 'production';

const config = require ( './' + envName + '.js' );
module.exports = config;
module.exports.env = envName;