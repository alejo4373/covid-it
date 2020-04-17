const { ParkingLot } = require('../db/models')

const renderIndex = async (req, res, next) => {
  const lots = await ParkingLot.getAll()
  console.log(lots)
  res.render('index', { lots })
}

const renderLot = async (req, res, next) => {
  const { lot_id } = req.params
  let [lot, notes] = await Promise.all([ParkingLot.getById(lot_id), ParkingLot.getNotes(lot_id)])
  res.render('lot', { lot, notes })
}

module.exports = {
  renderIndex,
  renderLot
}
