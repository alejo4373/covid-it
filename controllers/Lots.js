const { ParkingLot } = require('../db/models')

const renderIndex = async (req, res, next) => {
  const lots = await ParkingLot.getAll()
  console.log(lots)
  res.render('index', { lots })
}

const renderLot = async (req, res, next) => {
  const { lot_id } = req.params
  let [lot, notes] = await Promise.all([ParkingLot.getById(lot_id), ParkingLot.getNotes(lot_id)])
  const notesLanesMap = notes.reduce((map, note) => {
    if (map[note.lane_id]) {
      map[note.lane_id].push(note)
    } else {
      map[note.lane_id] = [note]
    }
    return map
  }, {})

  const lanesWithNotes = Object.values(notesLanesMap)
  res.render('lot', { lot, lanesWithNotes })
}

module.exports = {
  renderIndex,
  renderLot
}
