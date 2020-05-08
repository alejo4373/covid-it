const express = require('express');
const router = express.Router();
const {
  renderBoards,
  addBoardAndRedirect,
  renderBoard
} = require('../controllers/web/boards');

router.get('/', renderBoards)
router.post('/', addBoardAndRedirect)
router.get('/:board_id/:board_name?', renderBoard)

module.exports = router;
