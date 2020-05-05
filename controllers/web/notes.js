const { Notes } = require('../../db/models')

const renderNotes = async (req, res, next) => {
  const { board_name } = req.params

  let formattedTitle = ""
  let board_id = ""

  switch (board_name) {
    case "learned":
      formattedTitle = "We Have Learned";
      board_id = 1;
      break;
    case "wanttodo":
      formattedTitle = "We Want to Do"
      board_id = 2;
      break;
    case "gratefulfor":
      formattedTitle = "We Are Grateful For"
      board_id = 3;
      break;
  }

  const notes = await Notes.getAllByBoardId(board_id)
  res.render('notes', { notes, board_name, board_id, title: formattedTitle })
}

const renderIndex = (req, res, next) => {
  res.render('index')
}

module.exports = {
  renderNotes,
  renderIndex
}
