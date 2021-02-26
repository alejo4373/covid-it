const express = require('express');
const router = express.Router();
const {
  renderBoards,
  addBoardAndRedirect,
  renderBoard,
  renderCreateBoard
} = require('../controllers/web/boards');

router.get('/', renderBoards)
router.get('/create', renderCreateBoard)
router.post('/', addBoardAndRedirect)
router.get('/:board_id/:board_name?', renderBoard)

module.exports = router;
