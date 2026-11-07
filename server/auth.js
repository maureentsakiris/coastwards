// GitHub usernames allowed into the admin. Override with ADMIN_USERS=name1,name2
const ADMIN_USERS = ( process.env.ADMIN_USERS || 'maureentsakiris,ClaudiaCAU' )
	.split( ',' )
	.map( ( name ) => name.trim() )
	.filter( Boolean )

const isAdmin = ( req ) => {

	return !!( req.isAuthenticated && req.isAuthenticated() && req.user && ADMIN_USERS.includes( req.user.username ) )

}

// For API routes: answer with JSON instead of redirecting to the login page
const requireAdmin = ( req, res, next ) => {

	if( isAdmin( req ) ){

		return next()

	}

	res.status( 403 ).json( { status: 'KO', message: 'Not authorized' } )

}

module.exports = {
	isAdmin,
	requireAdmin
}
