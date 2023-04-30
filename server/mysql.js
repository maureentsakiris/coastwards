const mysql = require( 'mysql' )
const globalConfigs = require ( '../config/' )
const config = globalConfigs.mysql;


const pool  = mysql.createPool( {
	host: config.host,
	user: config.user,	
	password: config.password,
	database : config.database,
  port: Number(config.port),
	multipleStatements: true,
	charset: 'UTF8MB4_UNICODE_CI'
} )

module.exports = {
  pool
}
