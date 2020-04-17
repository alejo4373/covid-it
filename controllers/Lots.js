const { ParkingLot } = require('../db/models')

const renderIndex = async (req, res, next) => {
  const lots = await ParkingLot.getAll()
  console.log(lots)
  res.render('index', { lots })
}

module.exports = {
  renderIndex
}
