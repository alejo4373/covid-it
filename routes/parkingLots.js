const router = require('express').Router()
const { ParkingLot } = require('../db/models');

router.post('/', async (req, res, next) => {
  const lotName = req.body.name
  try {
    let newLot = await ParkingLot.create(lotName);
    res.json({
      payload: newLot,
      message: "new lot created",
      error: false
    })
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    let lots = await ParkingLot.getAll();
    res.json({
      payload: lots,
      message: "all lots retrieved",
      error: false
    })
  } catch (err) {
    next(err)
  }
})

router.post('/:lot_id/lanes', async (req, res, next) => {
  const { name } = req.body;
  const { lot_id } = req.params;
  const lane = { name, lot_id: lot_id }

  try {
    let newLane = await ParkingLot.addLane(lane);
    res.json({
      payload: newLane,
      message: `added new lane to lot: ${lot_id}`,
      error: false
    })
  } catch (err) {
    next(err)
  }
})

router.get('/:lot_id/notes', async (req, res, next) => {
  const { lot_id } = req.params
  try {
    let notes = await ParkingLot.getNotes(lot_id);
    res.json({
      payload: notes,
      message: `retrieved all notes for lot: ${lot_id}`,
      error: false
    })
  } catch (err) {
    next(err)
  }
})

router.post('/:lot_id/notes', async (req, res, next) => {
  const note = req.body
  const { lot_id } = req.params
  try {
    let newNote = await ParkingLot.addNote(note);
    res.json({
      payload: newNote,
      message: `added new note to lot: ${lot_id}, lane: ${note.lane_id}`,
      error: false
    })
  } catch (err) {
    next(err)
  }
})
module.exports = router;
