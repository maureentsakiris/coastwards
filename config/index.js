require( 'dotenv' ).config();

const config = require ( './env' );
module.exports = config;
module.exports.env = process.env.NODE_ENV || 'production';
