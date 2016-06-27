var envName = process.env.NODE_ENV || 'production';

console.log( "ENVIRONMENT: ", envName );

module.exports = require ( './' + envName + '.json' );
module.exports.env = envName;