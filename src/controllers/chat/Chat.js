const ChatSchema = require('../../routers/models/Chat')

class Chat {
  async allMassage(req, res) {
    try {
      const start = new Date(new Date().getTime() - 0.5 * 60 * 60 * 1000)
      const letters = await ChatSchema.find({ clan: '', date: { $gte: start } })
      res.status(200).json({ massage: 'find lastLetters', letters })
    } catch (error) {
      return res
        .status(504)
        .json({ massage: 'serverChat all massage is error', error })
    }
  }

  async blueMassage(req, res) {
    try {
      res.status(200).json({})
    } catch (error) {
      return res
        .status(504)
        .json({ massage: 'serverChat blue is error', error })
    }
  }

  async clanMassage(req, res) {
    try {
      res.status(200).json({})
    } catch (error) {
      return res
        .status(504)
        .json({ massage: 'serverChat clan is error', error })
    }
  }

  async yellowMassage(req, res) {
    try {
      res.status(200).json({})
    } catch (error) {
      return res
        .status(504)
        .json({ massage: 'serverChat yellow is error', error })
    }
  }

  async sendMassage(req, res) {
    try {
      const { rassa, massage, autor } = req.body
      const newMassage = new ChatSchema({
        rassa,
        massage,
        autor,
        autorID: req.id
      })
      await newMassage.save()
      res.status(200).json({ massage: 'find lastLetters' })
    } catch (error) {
      return res.status(404).json({ massage: 'massage not created!', error })
    }
  }
}

module.exports = new Chat()
