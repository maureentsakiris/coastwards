module.exports = {
	"mysql": {
		"host": process.env.MYSQL_HOST,
		"user": process.env.MYSQL_USER,
		"password": process.env.MYSQL_PASSWORD,
		"database": process.env.MYSQL_DATABASE,
		"port": Number( process.env.MYSQL_PORT ),
		"multipleStatements": true
	},
	"server": {
		"port": Number( process.env.HTTP_PORT ),
		"ip": process.env.HTTP_IP
	},
	"github": {
		"GITHUB_CLIENT_ID": process.env.GITHUB_CLIENT_ID,
		"GITHUB_CLIENT_SECRET": process.env.GITHUB_CLIENT_SECRET,
		"callbackURL": process.env.GITHUB_CALLBACK_URL
	}
}
