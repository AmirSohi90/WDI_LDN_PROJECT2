const User = require('../models/user');
const Novel = require('../models/dc-novel');

function newRoute(req, res){
  res.render('registrations/new');
}

function createRoute(req, res, next){
  User
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(next);
}

function profileRoute(req, res) {
  const selection = false;
  Novel.find()
    .then(novels => res.render('registrations/profile', {novels, selection}));
}

function profileFilterRoute(req, res){
  const selection = req.body.writer;
  Novel.find()
    .then(novels => res.render('registrations/profile', {novels, selection}));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  profile: profileRoute,
  profileFilter: profileFilterRoute
};
