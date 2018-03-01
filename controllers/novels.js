const Novel = require('../models/dc-novel');

function novelIndexRoute(req, res){
  const selection = false;
  Novel.find()
    .then(novels => res.render('dc-novels/index', {novels, selection}));
}

function novelFilterRoute(req, res){
  const selection = req.body.writer;
  Novel.find()
    .then(novels => res.render('dc-novels/index', {novels, selection}));
}

function novelNewRoute(req, res){
  Novel.find()
    .then(novels => res.render('dc-novels/new', {novels}));
}

function novelCreateRoute(req, res, next){

  req.body.user = req.currentUser;

  Novel.create(req.body)
    .then(() => res.redirect('/novels'))
    .catch(next);
}

function novelShowRoute(req, res, next){

  Novel.findById(req.params.id)
    .populate('user comments.user')
    .then(novel => {
      if(!novel) return res.render('pages/404');
      res.render('dc-novels/show', {novel});
    })
    .catch(next);
}

function novelEditRoute(req, res){
  Novel.findById(req.params.id)
    .then(novel => res.render('dc-novels/edit', {novel}));
}

function novelUpdateRoute(req, res){
  Novel.findById(req.params.id)
    .then(novel => Object.assign(novel, req.body))
    .then(novel => novel.save())
    .then(() => res.redirect(`/novels/${req.params.id}`));
}

function novelDeleteRoute(req, res){
  Novel.findById(req.params.id)
    .then(novel => novel.remove())
    .then(() => res.redirect('/novels'));
}

function novelCreateCommentRoute(req, res, next){
  req.body.user = req.currentUser;
  Novel.findById(req.params.id)
    .then(novel => {
      console.log(novel);
      novel.comments.push(req.body);
      return novel.save();
    })
    .then(novel => res.redirect(`/novels/${novel._id}`))
    .catch(next);
}

function novelDeleteCommentRoute(req, res, next){
  Novel.findById(req.params.id)
    .then(novel => {
      const comment = novel.comments.id(req.params.commentId);
      comment.remove();
      return novel.save();
    })
    .then(novel => res.redirect(`/novels/${novel._id}`))
    .catch(next);
}

function novelFavouriteRoute(req, res, next) {
  req.currentUser.favouriteList.push(req.params.id);

  req.currentUser.save()
    .then(() => res.redirect(`/novels/${req.params.id}`))
    .catch(next);
}

function deleteFavouriteRoute(req, res, next){
  req.currentUser.favouriteList = req.currentUser.favouriteList.filter(novel => {
    return !novel._id.equals(req.params.id);
  });

  req.currentUser.save()
    .then(() => res.redirect(`/novels/${req.params.id}`))
    .catch(next);
}

function commentApprovedRoute(req, res){
  Novel.findById(req.params.id)
    .then(novel => {
      const comment = novel.comments.id(req.params.commentId);
      comment.moderated = true;
      return novel.save();
    })
    .then(() => res.redirect(`/novels/${req.params.id}`));
}

// function novelDeleteFavouriteRoute(req, res, next){
//   const favourites = locals.currentUser.favouriteList
//   if(favourites.includes('current novel'))
// }

module.exports = {
  novelIndex: novelIndexRoute,
  novelFilter: novelFilterRoute,
  novelShow: novelShowRoute,
  novelNew: novelNewRoute,
  novelCreate: novelCreateRoute,
  novelEdit: novelEditRoute,
  novelUpdate: novelUpdateRoute,
  novelDelete: novelDeleteRoute,
  novelCommentCreate: novelCreateCommentRoute,
  novelDeleteComment: novelDeleteCommentRoute,
  // novelFavouriteIndex: favouriteIndexRoute,
  novelFavourite: novelFavouriteRoute,
  deleteFavourite: deleteFavouriteRoute,
  commentApprove: commentApprovedRoute
};
