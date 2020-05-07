var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware')
var postcssMiddleware = require('postcss-middleware')
var autoprefixer = require('autoprefixer')

var app = express();

// Web Controllers
const { renderIndex, renderNotes } = require('./controllers/web/notes')

// Web Routers
const boardsRouter = require('./routers/boards');

// Api Controllers
const notesApiController = require('./controllers/api/notes')

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

// Api Endpoints
app.use('/api/v1/notes', notesApiController);

// Website Endpoints
app.use('/boards', boardsRouter);
app.use('/:board_name', renderNotes);
app.use('/', renderIndex)

module.exports = app;
