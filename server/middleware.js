module.exports.isLoggedIn = (req, res, next) => {
  if(!Boolean(res.locals.currentUser)) {
    return res.status(403).json({ authenticated: false })
  }
  next();
}
