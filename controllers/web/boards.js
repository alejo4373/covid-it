const { Boards } = require('../../db/models')

const renderBoards = async (req, res, next) => {
  const boards = await Boards.getAll()
  res.render('boards', { title: "Boards", boards })
}

module.exports = {
  renderBoards,
}
