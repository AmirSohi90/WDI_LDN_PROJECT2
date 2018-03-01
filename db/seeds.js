const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Character = require('../models/dc-character');
let characterData = require('./data/dc-characters');
const Novel = require('../models/dc-novel');
let novelData = require('./data/dc-novels');
const User = require('../models/user');
const userData = require('./data/users');

let user = null;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dc-database', (err, db) => {
  db.dropDatabase();

  User.create(userData)
    .then(data => {
      user = data._id;
      console.log('User created');
      novelData = novelData.map(novel => {
        novel.user = user;
        return novel;
      });
      return Novel.create(novelData);
    })
    .then(novels => console.log(`${novels.length} novels created`))
    .then(() => {
      characterData = characterData.map(character => {
        character.user = user;
        return character;
      });
      return Character.create(characterData);
    })
    .then(characters => console.log(`${characters.length} character created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
