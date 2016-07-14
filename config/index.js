var envName = process.env.NODE_ENV || 'production';

module.exports = require ( './' + envName + '.json' );
module.exports.env = envName;