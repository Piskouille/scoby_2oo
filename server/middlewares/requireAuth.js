function requireAuth(req, res, next){
    if(req.session.currentUser){
        return next()
    }

    res.status(401).json({message : 'Unauthorized'})
}

module.exports = requireAuth