const router = require('express').Router()
const { Notes } = require('../../db/models');
const webSockets = require('../../webSockets')

router.post('/', async (req, res, next) => {
  const note = req.body
  try {
    let newNote = await Notes.add(note);
    res.json({
      payload: newNote,
      message: "new note created",
      error: false
    })

    const { clientSockets } = req.app.locals
    webSockets.broadcast(clientSockets, {
      type: "NEW_NOTE_ADDED",
      payload: newNote
    })

  } catch (err) {
    next(err)
  }
})

router.get('/:category', async (req, res, next) => {
  const { category } = req.params
  try {
    let notes = await Notes.getAllByCategory(category);
    res.json({
      payload: notes,
      message: `all notes by category: ${category} retrieved`,
      error: false
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router;
