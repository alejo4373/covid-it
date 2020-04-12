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
  console.log('i learned')
  res.render('ilearned')
});

app.use('/', (req, res, next) => {
  res.render('index')
});

module.exports = app;
