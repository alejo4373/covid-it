const { Notes } = require('../../db/models')

const renderNotes = async (req, res, next) => {
  const { category } = req.params

  const notes = await Notes.getAllByCategory(category)
  res.render('notes', { notes })
}

const renderIndex = (req, res, next) => {
  res.render('index')
}

module.exports = {
  renderNotes,
  renderIndex
}
