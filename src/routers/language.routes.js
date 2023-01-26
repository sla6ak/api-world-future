const { Router } = require('express')
const router = Router()
const errMassage = require('../configs/errors/errorMassage')
const { en } = require('../configs/language/en')
const { ua } = require('../configs/language/ua')
const { ru } = require('../configs/language/ru')

router.get('/en', (req, res) => {
  try {
    res.status(200).json(en)
  } catch (error) {
    errMassage(res, 504, error)
  }
})

router.get('/ua', (req, res) => {
  try {
    res.status(200).json(ua)
  } catch (error) {
    errMassage(res, 504, error)
  }
})

router.get('/ru', (req, res) => {
  try {
    res.status(200).json(ru)
  } catch (error) {
    errMassage(res, 504, error)
  }
})

module.exports = router
