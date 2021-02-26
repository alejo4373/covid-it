const { Boards, Notes } = require('../../db/models')

const renderBoards = async (req, res, next) => {
  const boards = await Boards.getAll()
  res.render('boards', { title: "Boards", boards })
}

const renderBoard = async (req, res, next) => {
  const { board_id, board_name } = req.params
  const [board, notes] = await Promise.all([
    Boards.getById(board_id),
    Notes.getAllByBoardId(board_id)
  ])

  const escapedBoardName = req.app.locals.URLEncode(board.name)
  if (!board_name || board_name !== board.name) {
    return res.redirect(`/boards/${board_id}/${escapedBoardName}`)
  }

  res.render('notes', {
    title: board.name,
    board_id,
    notes
  })
}

const addBoardAndRedirect = async (req, res, next) => {
  const newBoard = await Boards.add(req.body)
  res.redirect(`/boards/${newBoard.id}/${newBoard.name}`)
}

const renderCreateBoard = async (req, res, next) => {
  res.render('boards/create')
}

module.exports = {
  renderBoards,
  addBoardAndRedirect,
  renderBoard,
  renderCreateBoard
}
