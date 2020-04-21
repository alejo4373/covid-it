const { db } = require('../pgp')

const add = async (note) => {
  const insertNoteQuery = `
    INSERT INTO notes (message, username, language, category, country, city)
      VALUES ($/message/, $/username/, $/language/, $/category/, $/country/, $/city/) 
      RETURNING *
  `
  try {
    let newNote = await db.one(insertNoteQuery, note)
    return newNote
  } catch (err) {
    throw err;
  }
}

const getAll = async () => {
  try {
    let notes = await db.any("SELECT * FROM notes")
    return notes
  } catch (err) {
    throw err;
  }
}

const getAllByCategory = async (category) => {
  try {
    let query = "SELECT * FROM notes WHERE category = $/category/ ORDER BY created_at DESC"
    let notes = await db.any(query, { category })
    return notes
  } catch (err) {
    throw err;
  }
}

const getById = async (note_id) => {
  try {
    let note = await db.one("SELECT * FROM notes WHERE id = $/note_id/", { note_id })
    return note
  } catch (err) {
    throw err;
  }
}


module.exports = {
  add,
  getAll,
  getById,
  getAllByCategory,
}
