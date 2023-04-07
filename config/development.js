module.exports = {
	"mysql": {
		"host": process.env.MYSQL_HOST,
		"user": process.env.MYSQL_USER,
		"password": process.env.MYSQL_PASSWORD,
		"database": process.env.MYSQL_DATABASE,
		"multipleStatements": true
	},
	"server": {
		"port": 8888,
		"ip": "127.0.0.1"
	},
	"github": {
		"GITHUB_CLIENT_ID": process.env.GITHUB_CLIENT_ID,
		"GITHUB_CLIENT_SECRET": process.env.GITHUB_CLIENT_SECRET,
		"callbackURL": "http://127.0.0.1:8888/login/callback"
	}
}
