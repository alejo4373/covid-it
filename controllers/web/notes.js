const { Notes } = require('../../db/models')

const renderNotes = async (req, res, next) => {
  const { category } = req.params

  let formattedTitle = ""
  switch (category) {
    case "learned":
      formattedTitle = "We Have Learned";
      break;
    case "wanttodo":
      formattedTitle = "We Want to Do"
      break;
    case "gratefulfor":
      formattedTitle = "We Are Grateful For"
      break;
  }

  const notes = await Notes.getAllByCategory(category)
  res.render('notes', { notes, title: formattedTitle })
}

const renderIndex = (req, res, next) => {
  res.render('index')
}

module.exports = {
  renderNotes,
  renderIndex
}
