const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const userAuth = require('./lib/userAuth');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const router = require('./config/router');

const Character = require('./models/dc-character');
const Novel = require('./models/dc-novel');

Character.create();
Novel.create();

const app = express();

const PORT = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost/dc-database');

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(expressLayouts);

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride(req => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: '3r9uf9df9u',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use(userAuth);

app.use(router);

app.use((err, req, res, next) => {
  if(err === 'ValidationError') return res.render('pages/422');
  res.render('pages/500', {err});
  next(err);
});

app.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
