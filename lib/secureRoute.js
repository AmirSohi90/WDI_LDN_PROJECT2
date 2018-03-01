function secureRoute(req, res, next){
  if(!req.session.userId){
    req.flash('danger', 'You must be logged in to do that');
    return req.session.regenerate(() => res.redirect('/login'));
  }
  next();
}

module.exports = secureRoute;
