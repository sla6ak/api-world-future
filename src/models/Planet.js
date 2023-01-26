const { Schema, model } = require('mongoose')

const PlanetSchema = new Schema({
  namePlanet: { type: String },
  anomals: { type: Object },
  cristals: { type: Object },
  date: { type: Date, default: Date.now }
})

module.exports = model('Chat', PlanetSchema)
