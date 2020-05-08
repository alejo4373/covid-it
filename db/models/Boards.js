const { db } = require('../pgp')

const add = async (board) => {
  const insertBoardQuery = `
    INSERT INTO boards (name)
      VALUES ($/board_name/) 
      RETURNING *
  `
  try {
    let newBoard = await db.one(insertBoardQuery, board)
    return newBoard
  } catch (err) {
    throw err;
  }
}

const getById = async (id) => {
  try {
    let board = await db.oneOrNone("SELECT * FROM boards WHERE id = $1", id)
    return board
  } catch (err) {
    throw err;
  }
}

const getAll = async () => {
  try {
    let boards = await db.any("SELECT * FROM boards")
    return boards
  } catch (err) {
    throw err;
  }
}

module.exports = {
  add,
  getById,
  getAll
}
