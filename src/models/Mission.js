const { Schema, model, Types } = require('mongoose')

const MissionSchema = new Schema({
  nameMission: { type: String },
  date: { type: Date, default: Date.now },
  prize: { titlePrise: { type: String }, namberPrise: { type: Number } },
  timing: { type: Number },
  status: { type: String },
  user: { type: Types.ObjectId, ref: 'Lord', required: true }
})

module.exports = model('Mission', MissionSchema)
