const { db } = require('../pgp')

const create = async (name) => {
  const insertLotQuery = "INSERT INTO lots (name) VALUES ($/name/) RETURNING *"
  try {
    let lot = await db.one(insertLotQuery, { name })
    return lot
  } catch (err) {
    throw err;
  }
}

const getAll = async () => {
  try {
    let lots = await db.any("SELECT * FROM lots")
    return lots
  } catch (err) {
    throw err;
  }
}

const addLane = async (lane) => {
  const newLaneQuery = `
    INSERT INTO lanes(name, lot_id)
      VALUES($/name/, $/lot_id/)
      RETURNING * 
  `

  try {
    const newLane = await db.one(newLaneQuery, lane)
    return newLane
  } catch (err) {
    throw err;
  }
}

const addNote = async (note) => {
  const newNoteQuery = `
    INSERT INTO notes(message, username, lane_id)
      VALUES($/message/, $/username/, $/lane_id/)
      RETURNING *
  `

  try {
    const newNote = await db.one(newNoteQuery, note)
    return newNote
  } catch (err) {
    throw err;
  }
}

module.exports = {
  create,
  getAll,
  addNote,
  addLane
}
