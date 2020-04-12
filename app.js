var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

app.set('view engine', 'pug')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/ilearned', (req, res, next) => {
  res.render('board', { title: "Have Learned..." })
});

app.use('/iwanttodo', (req, res, next) => {
  res.render('board', { title: "Want to Do..." })
});

app.use('/', (req, res, next) => {
  res.render('index')
});

module.exports = app;
