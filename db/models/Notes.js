const { db } = require('../pgp')

const add = async (note) => {
  const insertNoteQuery = `
    INSERT INTO notes (message, username, language, board_id, country, city)
      VALUES ($/message/, $/username/, $/language/, $/board_id/, $/country/, $/city/) 
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

const getAllByBoardId = async (board_id) => {
  try {
    let query = "SELECT * FROM notes WHERE board_id = $/board_id/ ORDER BY created_at ASC"
    let notes = await db.any(query, { board_id })
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
  getAllByBoardId,
}
