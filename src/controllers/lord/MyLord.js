const LordSchema = require('../../models/Lord')
const baseLord = require('./baseLord')
const Error = require('../../configs/errors/errorMassage')

class MyLord {
  async createLord(req, res) {
    try {
      const { nikName, race } = req.body
      const duplicateNikName = await LordSchema.findOne({ nikName })
      if (duplicateNikName) {
        return res
          .status(404)
          .json({ massage: 'Choose another nik. This nikName is busy' })
      }
      let planet = 'BlueHome'
      if (race === 'Blue') {
        planet = 'BlueHome'
      } else if (race === 'Yellow') {
        planet = 'YellowHome'
      }
      const newLord = {
        ...baseLord,
        nikName,
        race,
        user: req.id,
        planet
      }
      const lord = new LordSchema(newLord)
      await lord.save()
      res.status(201).json(newLord)
    } catch (error) {
      return Error(res, 500, error)
    }
  }

  async getLord(req, res) {
    try {
      const lord = await LordSchema.findOne({ user: req.id }) // в миделвеере мы добавили в реквест поле ид при проверке токена
      if (!lord) {
        return Error(res, 404)
      }
      res.status(200).json({ data: lord })
    } catch (error) {
      return Error(res, 500, error)
    }
  }

  async choosePlanet(req, res) {
    try {
      const newLord = await LordSchema.findOneAndUpdate(
        { user: req.id },
        { ...req.body, dateOnline: Date.now }
      )
      res.status(201).json({ newLord })
    } catch (error) {
      return Error(res, 500, error)
    }
  }
}

module.exports = new MyLord()
