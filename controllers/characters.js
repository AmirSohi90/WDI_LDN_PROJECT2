const Character = require('../models/dc-character');

function characterIndexRoute(req, res) {
  const selection = false;
  Character.find()
    .then(characters => res.render('dc-characters/index', {characters, selection}));
}

function characterIndexFilter(req, res) {
  const selection = req.body.status;
  Character.find()
    .then(characters => res.render('dc-characters/index', {characters, selection}));
}

function characterNewRoute(req, res) {
  res.render('dc-characters/new');
}

function characterCreateRoute(req, res, next) {

  req.body.user = req.currentUser;

  Character.create(req.body)
    .then(() => res.redirect('/characters'))
    .catch(next);
}

function characterShowRoute(req, res, next) {
  Character.findById(req.params.id)
    .populate('user comments.user')
    .then(character => {
      if(!character) return res.render('pages/404');
      res.render('dc-characters/show', {character});
    })
    .catch(next);
}

function characterEditRoute(req, res){
  Character.findById(req.params.id)
    .then(character => res.render('dc-characters/edit', { character }));
}

function characterUpdateRoute(req, res){
  Character.findById(req.params.id)
    .then(character => Object.assign(character, req.body))
    .then(character => character.save())
    .then(() => res.redirect(`/characters/${req.params.id}`));
}

function characterDeleteRoute(req, res){
  Character.findById(req.params.id)
    .then(character => character.remove())
    .then(() => res.redirect('/characters'));
}


function characterCommentsCreateRoute(req, res, next){
  req.body.user = req.currentUser;
  Character.findById(req.params.id)
    .then(character => {
      console.log(character);
      character.comments.push(req.body);
      return character.save();
    })
    .then(character => res.redirect(`/characters/${character._id}`))
    .catch(next);
}

function characterCommentsDeleteRoute(req, res, next){
  Character.findById(req.params.id)
    .then(character => {
      const comment = character.comments.id(req.params.commentId);
      comment.remove();
      return character.save();
    })
    .then(character => res.redirect(`/characters/${character._id}`))
    .catch(next);
}

module.exports = {
  index: characterIndexRoute,
  filter: characterIndexFilter,
  show: characterShowRoute,
  new: characterNewRoute,
  create: characterCreateRoute,
  edit: characterEditRoute,
  update: characterUpdateRoute,
  delete: characterDeleteRoute,
  commentsCreate: characterCommentsCreateRoute,
  commentsDelete: characterCommentsDeleteRoute
};
