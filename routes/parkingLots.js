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

router.post('/:lotId/lanes', async (req, res, next) => {
  const { name } = req.body;
  const { lotId } = req.params;
  const lane = { name, lot_id: lotId }

  try {
    let newLane = await ParkingLot.addLane(lane);
    res.json({
      payload: newLane,
      message: `added new lane to lot: ${lotId}`,
      error: false
    })
  } catch (err) {
    next(err)
  }
})

router.post('/:lotId/notes', async (req, res, next) => {
  const note = req.body
  try {
    let newNote = await ParkingLot.addNote(note);
    res.json({
      payload: newNote,
      message: `added new note to lot: ${lotId}`,
      error: false
    })
  } catch (err) {
    next(err)
  }
})
module.exports = router;
