const express = require('express');
const router = express.Router();
const { renderBoards } = require('../controllers/web/boards');

router.get('/', renderBoards)

module.exports = router;
