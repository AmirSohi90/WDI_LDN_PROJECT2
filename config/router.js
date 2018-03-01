const router = require('express').Router();
const characters = require('../controllers/characters');
const novels = require('../controllers/novels');
const registration = require('../controllers/registrations');
const session = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const adminRoute = require('../lib/adminRoute');

router.get('/', (req, res) => res.render('pages/home'));

router.route('/characters/new')
  .get(secureRoute, characters.new);

router.route('/characters')
  .get(characters.index)
  .post(secureRoute, characters.create);

router.route('/characters/filter')
  .post(characters.filter);

router.route('/characters/:id')
  .get(characters.show)
  .put(secureRoute, characters.update)
  .delete(secureRoute, characters.delete);

router.route('/characters/:id/edit')
  .get(secureRoute, characters.edit);

router.route('/characters/:id/comments')
  .post(secureRoute, characters.commentsCreate);

router.route('/characters/:id/comments/:commentId')
  .delete(secureRoute, characters.commentsDelete);

router.route('/novels/new')
  .get(secureRoute, novels.novelNew);

router.route('/novels')
  .get(novels.novelIndex)
  .post(secureRoute, novels.novelCreate);

router.route('/novels/filter')
  .post(novels.novelFilter);

router.route('/novels/:id')
  .get(novels.novelShow)
  .put(secureRoute, novels.novelUpdate)
  .delete(secureRoute, novels.novelDelete);

router.route('/novels/:id/edit')
  .get(secureRoute, novels.novelEdit);

router.route('/novels/:id/comments')
  .post(secureRoute, novels.novelCommentCreate);

router.route('/novels/:id/comments/:commentId')
  .put(adminRoute, novels.commentApprove)
  .delete(secureRoute, novels.novelDeleteComment);

router.route('/novels/:id/favorite')
  .post(secureRoute, novels.novelFavourite)
  .delete(secureRoute, novels.deleteFavourite);

router.route('/register')
  .get(registration.new)
  .post(registration.create);

router.route('/profile')
  .get(secureRoute, registration.profile);

router.route('/profile/filter')
  .post(secureRoute, registration.profileFilter);

router.route('/login')
  .get(session.new)
  .post(session.create);

router.route('/logout')
  .get(session.delete);

router.all('/*', (req, res) => res.render('pages/404'));

module.exports = router;
