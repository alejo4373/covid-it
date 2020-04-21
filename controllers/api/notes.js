const router = require('express').Router()
const { Notes } = require('../../db/models');

router.post('/', async (req, res, next) => {
  const note = req.body
  try {
    let newNote = await Notes.add(note);
    res.json({
      payload: newNote,
      message: "new note created",
      error: false
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
