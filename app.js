var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware')
var postcssMiddleware = require('postcss-middleware')
var autoprefixer = require('autoprefixer')

var app = express();

// Routers
const parkingLots = require('./routes/parkingLots')

// Controllers
const { renderIndex } = require('./controllers/Lots')
app.set('view engine', 'pug')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
}))

app.use('/stylesheets', postcssMiddleware({
  plugins: [autoprefixer()],
  src: (req) => path.join(__dirname, 'public/stylesheets', req.path)
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/lots', parkingLots);
app.use('/board/:id', (req, res, next) => {
  res.render('board', { title: "Sample Board" })
});


app.use('/', renderIndex)

module.exports = app;
